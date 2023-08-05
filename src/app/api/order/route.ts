import { getOrderWithItemsById } from '@/lib/prisma/order';

import { NextRequest, NextResponse } from "next/server";


import {
    serializeOrderWithItems,
} from "@/lib/prisma/serialization";


const logger = require("@/lib/utils/logger");
const orderLogger = logger.child({
    origin: "API order",
});


export async function GET(request: NextRequest) {
    try {

        const url = new URL(request.url)
        const { searchParams } = url

        const id = searchParams.get("orderId")
        orderLogger.info("orderId");
        orderLogger.info(id);
        if (id) {

            const order = await getOrderWithItemsById({ id })
            if (!order || !('id' in order)) {
                return NextResponse.json(
                    { success: false, message: "Error receiving order" },
                    { status: 400 },
                );
            }
            const serializedOrder = serializeOrderWithItems(order);
            if (!serializedOrder) {
                return NextResponse.json(
                    { success: false, message: "Error serializing order" },
                    { status: 400 },
                );
            }
            orderLogger.info({ serializedOrder });
            return NextResponse.json(
                { order: serializedOrder },
                { status: 200 },
            );
        }
    }
    catch (error) {
        orderLogger.error(error);
        return NextResponse.json(
            { error },
            { status: 400 },
        );
    }
}
