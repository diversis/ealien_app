import { Product } from "./product";
import {
    CompactOrderItem,
    CompactProduct,
    SerializedPrisma,
} from "./types";
import {
    Order,
    Review,
    ShippingAddress,
} from "@prisma/client";

const logger = require("@/lib/utils/logger");
const serializationLogger = logger.child({
    origin: "Prisma Serialization",
});

export const serializeProduct = (
    product: Product,
): SerializedPrisma<Product> | null => {
    try {
        const serializableProduct = {
            ...product,
            discount: Number(product.discount),
            width: Number(product.width),
            height: Number(product.height),
            length: Number(product.length),
            weight: Number(product.weight),
            rating: Number(product.rating),
            price: Number(product.price),
            createdAt: Number(product.createdAt),
            updatedAt: Number(product.updatedAt),
        };
        return serializableProduct;
    } catch (e) {
        serializationLogger.error({ e });
    }

    return null;
};

export const serializeCompactProduct = (
    product: CompactProduct,
): SerializedPrisma<CompactProduct> | null => {
    try {
        const serializableProduct = {
            ...product,

            rating: Number(product.rating),
            price: Number(product.price),
        };
        return serializableProduct;
    } catch (e) {
        serializationLogger.error({ e });
    }

    return null;
};

export const serializeOrder = (
    order: Order,
): SerializedPrisma<Order> | null => {
    try {
        const serializableOrder = {
            ...order,
            totalPrice: Number(order.totalPrice),
            taxPrice: Number(order.taxPrice),
            shippingPrice: Number(order.shippingPrice),
            paidAt: Number(order.paidAt),
            deliveredAt: Number(order.deliveredAt),
            createdAt: Number(order.createdAt),
            updatedAt: Number(order.updatedAt),
        };
        return serializableOrder;
    } catch (e) {
        serializationLogger.error({ e });
    }

    return null;
};

export const serializeReview = <T extends Review>(
    review: T,
) => {
    try {
        const serializableReview = {
            ...review,
            rating: Number(review.rating),
            createdAt: Number(review.createdAt),
            updatedAt: Number(review.updatedAt),
        };
        return serializableReview;
    } catch (e) {
        serializationLogger.error({ e });
    }

    return null;
};


export const serializeOrderWithItems = (
    order: Order & {
        orderItems: (CompactOrderItem & {
            product: CompactProduct;
        })[];
    },
):
    | (SerializedPrisma<Order> & {
        orderItems: (SerializedPrisma<CompactOrderItem> & {
            product: SerializedPrisma<CompactProduct>;
        })[];
    })
    | null => {
    try {
        const serializableOrder = {
            ...order,
            totalPrice: Number(order.totalPrice),
            taxPrice: Number(order.taxPrice),
            shippingPrice: Number(order.shippingPrice),
            paidAt: Number(order.paidAt),
            deliveredAt: Number(order.deliveredAt),
            createdAt: Number(order.createdAt),
            updatedAt: Number(order.updatedAt),
            orderItems: [
                ...order.orderItems.map(
                    ({
                        product,
                        ...item
                    }): SerializedPrisma<CompactOrderItem> & {
                        product: SerializedPrisma<CompactProduct>;
                    } => ({
                        ...item,
                        price: Number(item.price),
                        product: {
                            ...product,
                            rating: Number(product.rating),
                            price: Number(product.price),
                        },
                    }),
                ),
            ],
        };
        return serializableOrder;
    } catch (e) {
        serializationLogger.error({ e });
    }

    return null;
};

export const serializeShippingAddress = (
    shippingAddress: ShippingAddress,
): SerializedPrisma<ShippingAddress> | null => {
    try {
        const serializableShippingAddress = {
            ...shippingAddress,
            shippingPrice: Number(
                shippingAddress.shippingPrice,
            ),
            createdAt: Number(shippingAddress.createdAt),
            updatedAt: Number(shippingAddress.updatedAt),
        };
        return serializableShippingAddress;
    } catch (e) {
        serializationLogger.error({ e });
    }

    return null;
};
