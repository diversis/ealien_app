import { Product } from "./product";
import { CompactProduct, SerializableNext } from "./types";
import {
    Order,
    Review,
    ShippingAddress,
} from "@prisma/client";

const logger = require("@/lib/utils/logger");
const emailLogger = logger.child({
    origin: "Prisma Serialization",
});

export const serializeProduct = (
    product: Product,
): SerializableNext<Product> => {
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
};

export const serializeCompactProduct = (
    product: CompactProduct,
): SerializableNext<CompactProduct> => {
    const serializableProduct = {
        ...product,

        rating: Number(product.rating),
        price: Number(product.price),
    };

    return serializableProduct;
};

export const serializeOrder = (
    order: Order,
): SerializableNext<Order> => {
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
};

export const serializeReview = (
    review: Review,
): SerializableNext<Review> => {
    const serializableReview = {
        ...review,
        createdAt: Number(review.createdAt),
        updatedAt: Number(review.updatedAt),
    };

    return serializableReview;
};

export const serializeShippingAddress = (
    shippingAddress: ShippingAddress,
): SerializableNext<ShippingAddress> => {
    const serializableShippingAddress = {
        ...shippingAddress,
        shippingPrice: Number(
            shippingAddress.shippingPrice,
        ),
        createdAt: Number(shippingAddress.createdAt),
        updatedAt: Number(shippingAddress.updatedAt),
    };

    return serializableShippingAddress;
};
