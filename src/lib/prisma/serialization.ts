import { Product } from "./product";
import { CompactProduct, SerializableNext } from "./types";
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
): SerializableNext<Product> | null => {
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
): SerializableNext<CompactProduct> | null => {
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
): SerializableNext<Order> | null => {
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

export const serializeReview = (
    review: Review,
): SerializableNext<Review> | null => {
    try {
        const serializableReview = {
            ...review,
            createdAt: Number(review.createdAt),
            updatedAt: Number(review.updatedAt),
        };
        return serializableReview;
    } catch (e) {
        serializationLogger.error({ e });
    }

    return null;
};

export const serializeShippingAddress = (
    shippingAddress: ShippingAddress,
): SerializableNext<ShippingAddress> | null => {
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
