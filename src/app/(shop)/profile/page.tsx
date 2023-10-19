import Profile from "./profile";
// import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { redirect } from "next/navigation";

import { serializeOrder } from "@/lib/prisma/serialization";
import { SerializedPrisma } from "@/lib/prisma/types";
import { getOrdersByUserId } from "@/lib/prisma/order";
import { Order } from "@prisma/client";
import { getServerSession } from "@/lib/utils/getServerSession";

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
        let serializedOrders: SerializedPrisma<Order>[] =
            [];
        if (orders.length > 0)
            serializedOrders = orders
                .map((order) => serializeOrder(order))
                .filter(
                    Boolean,
                ) as SerializedPrisma<Order>[];

        return <Profile orders={serializedOrders} />;
    } catch (e) {
        orderIdLogger.error({ e });
        redirect("/catalogue");
    }
}
