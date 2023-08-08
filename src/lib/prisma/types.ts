import { OrderItem, Product, Prisma } from "@prisma/client";

export type SerializedPrisma<T> = {
    [Property in keyof T]: ToNumber<T[Property]>;
};

export type ToNumber<T> = T extends Prisma.Decimal | Date
    ? number
    : T;

export type CartItem =
    SerializedPrisma<CompactProduct>
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

export type ReviewWithAuthor = Prisma.ReviewGetPayload<{ include: { user: { select: { name: true, image: true } } } }>