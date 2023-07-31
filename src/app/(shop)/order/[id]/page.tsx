import Order from "./order";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { Metadata } from "next";
import { redirect } from "next/navigation";

import {
    Product,
    getBestProducts,
    getProductListItems,
} from "@/lib/prisma/product";
import {
    serializeCompactProduct,
    serializeOrderWithItems,
    serializeProduct,
} from "@/lib/prisma/serialization";
import { SerializedPrisma } from "@/lib/prisma/types";
import {
    getOrderById,
    getOrderWithItemsById,
} from "@/lib/prisma/order";

export type OrderPageProps = {
    params: { id: string };
    searchParams: {
        [key: string]: string | string[] | undefined;
    };
};

const logger = require("@/lib/utils/logger");
const orderIdLogger = logger.child({
    origin: "Order Id Page",
});

export default async function Page({
    params,
    searchParams,
}: OrderPageProps) {
    // Fetch data directly in a Server Component
    // const session = await getServerSession(authOptions);

    // const order = await getOrderById({id:params.id})
    try {
        const order = await getOrderWithItemsById({
            id: params.id,
        });
        if (!order) redirect("/catalogue");

        let serializedOrder = null;
        if (order && "id" in order)
            serializedOrder =
                serializeOrderWithItems(order);
        if (!serializedOrder) redirect("/catalogue");

        return <Order order={serializedOrder} />;
    } catch (e) {
        orderIdLogger.error({ e, id: params.id });
        redirect("/catalogue");
    }
}
