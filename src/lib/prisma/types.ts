import { OrderItem, Product, Order } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";

export type SerializedNext<T> = {
    [Property in keyof T]: ToNumber<T[Property]>;
};

export type ToNumber<T> = T extends Decimal | Date
    ? number
    : T;

export type CartItem = 
    SerializedNext<CompactProduct> 
 & {
    qty: number;
};

export type CompactProduct = Pick<
    Product,
    | "id"
    | "name"
    | "price"
    | "image"
    | "countInStock"
    | "rating"
    | "currencyId"
>;

export type CompactOrderItem = Pick<
    OrderItem,
    "id" | "orderId" | "qty" | "price"
>;

// export type SerializableCompactOrderItem = Pick<
//     SerializedNext<OrderItem>,
//     "id" | "orderId" | "qty" | "price"
// >;
