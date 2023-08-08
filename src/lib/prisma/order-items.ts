import { Prisma } from "@prisma/client";
import prisma from "./prisma";
import { CompactOrderItem, CompactProduct } from "./types";
const logger = require("@/lib/utils/logger");
const orderItemLogger = logger.child({ origin: "prisma orderItem" });

export async function getOrderItemById({
    id,
}: {
    id: string;
}): Promise<
    (CompactOrderItem & { product: CompactProduct }) | { errors: unknown }
> {
    {
        try {
            const orderItem = prisma.orderItem.findUniqueOrThrow({
                where: { id },
                select: {
                    id: true,
                    orderId: true,
                    qty: true,
                    price: true,
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
            });
            return orderItem;
        } catch (e) {
            orderItemLogger.error(e);
            return { errors: e };
        }
    }
}

export async function getOrderItemsByOrderId({
    orderId,
}: {
    orderId: string;
}): Promise<
    {
        product: {
            id: string;
            name: string;
            image: string | null;
            categories: {
                name: string;
            }[];
            currencyId: string;
            description: string | null;
            rating: Prisma.Decimal | null;
            countInStock: number | null;
            price: Prisma.Decimal | null;
        };
        id: string;
        price: Prisma.Decimal;
        orderId: string;
        qty: number;
    }[]
> {
    try {
        const orderItems = prisma.orderItem.findMany({
            where: { orderId },
            select: {
                id: true,
                orderId: true,
                qty: true,
                price: true,
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
        });
        return orderItems;
    } catch (e) {
        orderItemLogger.error(e);
        return [];
    }
}
