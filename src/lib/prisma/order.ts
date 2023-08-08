import { CompactOrderItem, CompactProduct } from "./types";
import { CartItem } from "@/lib/prisma/types";
import prisma from "./prisma";
import { getProduct } from "./product";
import {
    getUserByID,
    getUserByIDWithShippingAddress,
} from "./user";
import {
    Order,
    OrderItem,
    Prisma,
    Product,
    User,
} from "@prisma/client";

const logger = require("@/lib/utils/logger");
const orderLogger = logger.child({
    origin: "prisma order",
});

const createOrderItems = async ({
    items,
    orderId,
}: {
    items: {
        price: Prisma.Decimal;
        countInStock: number;
        rating: Prisma.Decimal;
        name: string;
        id: string;
        image: string | null;
        currencyId: string;
        qty: number;
    }[];
    orderId: string;
}) => {
    try {
        await prisma.orderItem.createMany({
            data: [
                ...items.map(
                    ({ id, qty, name, price }) => ({
                        price,
                        qty,
                        orderId: orderId,
                        productId: id,
                    }),
                ),
            ],
        });
    } catch (e) {
        await prisma.order.delete({
            where: {
                id: orderId,
            },
        });
        throw e;
    }
};

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
    items: CartItem[];
}) {
    const totalPrice = items.reduce(
        (sum, item) =>
            sum +
            Number(
                ((item.price || 0) * item.qty).toFixed(2),
            ),
        0,
    );

    try {
        const dbItems = await Promise.all(
            items.map(async (item) => {
                const product: Product | null =
                    await getProduct({
                        id: item.id,
                    });
                if (!product) {
                    throw new Error(
                        `product from cart not found. id= ${item.id} name= ${item.name}`,
                    );
                }
                if (
                    !product.countInStock ||
                    product.countInStock < 1
                ) {
                    throw new Error(
                        `product from cart not available. id= ${item.id} name= ${item.name}`,
                    );
                }
                const {
                    price,
                    name,
                    countInStock,
                    rating,
                } = product;
                if (countInStock < item.qty) {
                    throw new Error(
                        `Specified quantity (${item.qty}) not availabale for product, in stock: ${countInStock}. id= ${item.id} name= ${item.name}`,
                    );
                }

                if (!price) {
                    throw new Error(
                        `product's price not specified. name= ${name}`,
                    );
                }
                return {
                    ...item,
                    price: price as Prisma.Decimal,
                    countInStock: countInStock as number,
                    rating: rating as Prisma.Decimal,
                    name,
                };
            }),
        );

        if (userId) {
            // let errors: { [key: string]: string }[] = [];
            const user =
                await getUserByIDWithShippingAddress(
                    userId,
                );
            logger.info(
                "user with shipping address: ",
                user,
            );
            const shippingAddress =
                user?.shippingAddress &&
                    user?.shippingAddress.length > 0
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
                throw new Error(
                    "shipping address processing error",
                );
            }

            const newOrder: Order =
                await prisma.order.create({
                    data: {
                        isDelivered: false,
                        isPaid: false,
                        paymentMethod,
                        totalPrice,
                        userId,
                        shippingAddressId:
                            shippingAddress.id,
                        // shippingAddress: {
                        //     connect: {
                        //         id: shippingAddress.id,
                        //     },
                        // },
                    },
                });
            const newOrderItems = await createOrderItems({
                items: dbItems,
                orderId: newOrder.id,
            });
            return { orderId: newOrder.id };
            //     const newOrder = await prisma.order.create({
            //     data: {
            //         userId,

            //     },
            // });
        }

        // let errors: { [key: string]: string }[] = [];
        const shippingAddress =
            await prisma.shippingAddress.create({
                data: {
                    shippingPrice,
                    address,
                    city,
                    postalCode,
                    country,
                },
            });

        if (!shippingAddress) {
            throw new Error(
                "shipping address processing error",
            );
        }

        const newOrder: Order = await prisma.order.create({
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
        const newOrderItems = await createOrderItems({
            items: dbItems,
            orderId: newOrder.id,
        });
        return { orderId: newOrder.id };
        //     const newOrder = await prisma.order.create({
        //     data: {
        //         userId,

        //     },
        // });
    } catch (e) {
        orderLogger.error(e);
        return null;
    }
}

export async function getOrderById({
    id,
}: {
    id: Order["id"];
}) {
    try {
        const order = await prisma.order.findUniqueOrThrow({
            where: { id },
        });
        return order;
    } catch (e) {
        orderLogger.error(e);
        return { errors: e };
    }
}

export async function updateOrderById({
    id,
    isPaid,
    isDelivered,
    shippingAddressId,
    paypalID
}: {
    id: Order["id"];
    isPaid?: boolean;
    isDelivered?: boolean;
    shippingAddressId?: string;
    paypalID?: string
}) {
    try {
        const order = await prisma.order.update({
            where: { id },
            data: {
                ...isPaid ? { isPaid: true, paidAt: new Date() } : null,
                ...isDelivered ? { isDelivered: true, deliveredAt: new Date() } : null,
                ...!!shippingAddressId ? { shippingAddressId } : null,
                ...!!paypalID ? { paypalID } : null
            }
        });
        return order;
    } catch (e) {
        orderLogger.error(e);
        return { errors: e };
    }
}

export async function updateOrderPaymentStatus({
    paypalID
}: {
    paypalID: string
}) {
    try {
        orderLogger.info({ paypalID });
        const order = await prisma.order.update({
            where: { paypalID },
            data: {
                isPaid: true, paidAt: new Date(),
            }
        });
        return order;
    } catch (e) {
        orderLogger.error(e);
        return { errors: e };
    }
}

export async function getOrderWithItemsById({
    id,
}: {
    id: Order["id"];
}): Promise<
    | (Order & {
        orderItems: (CompactOrderItem & {
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
                    select: {
                        id: true,
                        price: true,
                        orderId: true,
                        qty: true,
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
                                categories: {
                                    select: { name: true },
                                },
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

export async function getOrdersByUserId({
    id,
}: {
    id: User["id"];
}): Promise<Order[]> {
    try {
        const orders = await prisma.order.findMany({
            where: { userId: id },
        });
        return orders;
    } catch (e) {
        orderLogger.error(e);
        return [];
    }
}
