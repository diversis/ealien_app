import { CompactProduct } from "./types";
import { SerializableCartItem } from "@/lib/prisma/types";
import prisma from "./prisma";
import { getProduct } from "./product";
import { getUserByID, getUserByIDWithShippingAddress } from "./user";
import { Order, OrderItem, User } from "@prisma/client";

const logger = require("@/lib/utils/logger");
const orderLogger = logger.child({ origin: "prisma order" });

export async function createOrder({
    userId,
    email,
    address,
    city,
    postalCode,
    country,
    paymentMethod,
    items,
    shippingPrice,
    customerName,
}: {
    userId?: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    paymentMethod: string;
    shippingPrice: number;
    customerName?: string;
    items: SerializableCartItem[];
}) {
    const totalPrice = items.reduce(
        (sum, item) => sum + Number(((item.price || 0) * item.qty).toFixed(2)),
        0,
    );

    if (userId) {
        let errors: { [key: string]: string }[] = [];
        try {
            const user = await getUserByIDWithShippingAddress(userId);
            logger.info("user with shipping address: ", user);
            const shippingAddress =
                user?.shippingAddress && user?.shippingAddress.length > 0
                    ? user.shippingAddress[0]
                    : await prisma.shippingAddress.create({
                          data: {
                              shippingPrice,
                              address,
                              city,
                              postalCode,
                              country,
                              users: {
                                  connect: {
                                      id: userId,
                                  },
                              },
                          },
                      });

            if (!shippingAddress) {
                errors.push({
                    shippingAddress: "shipping address processing error",
                });
                throw new Error("shipping address processing error");
            }

            const newOrder = await prisma.order.create({
                data: {
                    isDelivered: false,
                    isPaid: false,
                    paymentMethod,
                    totalPrice,
                    userId,
                    shippingAddressId: shippingAddress.id,
                    // shippingAddress: {
                    //     connect: {
                    //         id: shippingAddress.id,
                    //     },
                    // },
                },
            });
            const orderItems = await items.map(async ({ id, qty, name }) => {
                const product = await getProduct(id);
                if (!product) {
                    errors.push({
                        id: `product from cart not found. name= ${name}`,
                    });
                    return null;
                }

                if (!product.countInStock || product.countInStock < 1) {
                    errors.push({
                        id: `product from cart not available. name= ${name}`,
                    });
                }
                const { price } = product;
                if (!price) {
                    errors.push({
                        [product.name]: "product's price not specified",
                    });
                    throw new Error(
                        "product's price not specified " + product.name,
                    );
                }
                return await prisma.orderItem.create({
                    data: {
                        price,
                        qty,
                        orderId: newOrder.id,
                        productId: product.id,
                    },
                });
            });
            return errors?.length > 0
                ? { orderId: newOrder.id, errors: errors }
                : { orderId: newOrder.id };
            //     const newOrder = await prisma.order.create({
            //     data: {
            //         userId,

            //     },
            // });
        } catch (e) {
            orderLogger.error(e);
            return { errors: e };
        }
    }
    let errors: { [key: string]: string }[] = [];
    try {
        const shippingAddress = await prisma.shippingAddress.create({
            data: {
                shippingPrice,
                address,
                city,
                postalCode,
                country,
            },
        });

        if (!shippingAddress) {
            errors.push({
                shippingAddress: "shipping address processing error",
            });
            throw new Error("shipping address processing error");
        }

        const newOrder = await prisma.order.create({
            data: {
                isDelivered: false,
                isPaid: false,
                paymentMethod,
                totalPrice,
                email,
                customerName,
                shippingAddressId: shippingAddress.id,
                // shippingAddress: {
                //     connect: {
                //         id: shippingAddress.id,
                //     },
                // },
            },
        });
        const orderItems = await items.map(async ({ id, qty, name }) => {
            const product = await getProduct(id);
            if (!product) {
                errors.push({
                    id: `product from cart not found. name= ${name}`,
                });
                return null;
            }

            if (!product.countInStock || product.countInStock < 1) {
                errors.push({
                    id: `product from cart not available. name= ${name}`,
                });
            }
            const { price } = product;
            if (!price) {
                errors.push({
                    [product.name]: "product's price not specified",
                });
                throw new Error(
                    "product's price not specified " + product.name,
                );
            }
            return await prisma.orderItem.create({
                data: {
                    price,
                    qty,
                    orderId: newOrder.id,
                    productId: product.id,
                },
            });
        });
        return errors?.length > 0
            ? { orderId: newOrder.id, errors: errors }
            : { orderId: newOrder.id };
        //     const newOrder = await prisma.order.create({
        //     data: {
        //         userId,

        //     },
        // });
    } catch (e) {
        orderLogger.error(e);
        return { errors: e };
    }
}

export async function getOrderById(id: Order["id"]) {
    try {
        const order = await prisma.order.findUniqueOrThrow({ where: { id } });
        return order;
    } catch (e) {
        orderLogger.error(e);
        return { errors: e };
    }
}

export async function getOrderWithItemsById(id: Order["id"]): Promise<
    | (Order & {
          orderItems: (OrderItem & {
              product: CompactProduct;
          })[];
      })
    | never[]
> {
    try {
        const order = prisma.order.findUniqueOrThrow({
            where: { id },
            include: {
                orderItems: {
                    include: {
                        product: {
                            select: {
                                id: true,
                                name: true,
                                description: true,
                                price: true,
                                image: true,
                                countInStock: true,
                                rating: true,
                                currencyId: true,
                                categories: { select: { name: true } },
                            },
                        },
                    },
                },
            },
        });
        return order;
    } catch (e) {
        orderLogger.error(e);
        return [];
    }
}

export async function getOrdersByUserId(id: User["id"]) {
    try {
        const orders = await prisma.order.findMany({ where: { userId: id } });
        return orders;
    } catch (e) {
        orderLogger.error(e);
        return { errors: e };
    }
}
