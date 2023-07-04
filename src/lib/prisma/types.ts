import { OrderItem, Product, Order } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";

export type SerializableProduct = SerializableNext<Product>;

export type SerializableNext<T> = {
    [Property in keyof T]: ToNumber<T[Property]>;
};

export type ToNumber<T> = T extends Decimal | Date ? number : T;

export type SerializableCompactProduct = Pick<
    SerializableProduct,
    "id" | "name" | "price" | "image" | "countInStock" | "rating" | "currencyId"
>;

export type SerializableCartItem = Pick<
    SerializableCompactProduct,
    "id" | "price" | "image" | "rating" | "name" | "countInStock"
> & {
    qty: number;
};

export type CompactProduct = Pick<
    Product,
    "id" | "name" | "price" | "image" | "countInStock" | "rating" | "currencyId"
>;

export type CompactOrderItem = Pick<
    OrderItem,
    "id" | "orderId" | "qty" | "price"
>;

export type SerializableOrderItem = SerializableNext<OrderItem>;

export type SerializableCompactOrderItem = Pick<
    SerializableOrderItem,
    "id" | "orderId" | "qty" | "price"
>;

export type SerializableOrder = SerializableNext<Order>;
