import Profile from "./profile";
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
    serializeOrder,
    serializeOrderWithItems,
    serializeProduct,
} from "@/lib/prisma/serialization";
import { SerializableNext } from "@/lib/prisma/types";
import {
    getOrderById,
    getOrderWithItemsById,
    getOrdersByUserId,
} from "@/lib/prisma/order";
import { Order } from "@prisma/client";

export type ProfilePageProps = {
    searchParams: {
        [key: string]: string | string[] | undefined;
    };
};

const logger = require("@/lib/utils/logger");
const orderIdLogger = logger.child({
    origin: "Order Id Page",
});

export default async function Page({
    searchParams,
}: ProfilePageProps) {
    // Fetch data directly in a Server Component
    // const session = await getServerSession(authOptions);

    // const order = await getOrderById({id:params.id})
    try {
        const session = await getServerSession(authOptions);
        if (!session) redirect("/catalogue");
        const { email, image, name, id } =
            session?.user || {};
        if (!email) redirect("/catalogue");
        const orders = await getOrdersByUserId({ id });
        let serializedOrders: SerializableNext<Order>[] =
            [];
        if (orders.length > 0)
            serializedOrders = orders
                .map((order) => serializeOrder(order))
                .filter(
                    Boolean,
                ) as SerializableNext<Order>[];

        return <Profile orders={serializedOrders} />;
    } catch (e) {
        orderIdLogger.error({ e });
        redirect("/catalogue");
    }
}
