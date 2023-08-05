
import { NextRequest, NextResponse } from "next/server";
import client from '@/lib/utils/paypal'
import { getOrderById, updateOrderById, updateOrderPaymentStatus } from "@/lib/prisma/order";

const paypal = require('@paypal/checkout-server-sdk');
const logger = require("@/lib/utils/logger");
const paypalLogger = logger.child({
    origin: "API paypal capture order",
});

export async function POST(request: NextRequest) {
    try {
        const req = await request.json();
        paypalLogger.info('req: ')
        paypalLogger.info({ req })
        const orderID = req.orderID
        paypalLogger.info('order ID: ' + orderID)

        if (!orderID) {
            paypalLogger.error('no Order ID')
            return NextResponse.json(
                { success: false, message: "Order ID not provided" },
                { status: 500 },
            );
        }
        const PaypalClient = client()
        const paypalRequest = new paypal.orders.OrdersCaptureRequest(orderID)
        paypalRequest.requestBody({})
        const response = await PaypalClient.execute(paypalRequest)
        if (!response) {
            return NextResponse.json(
                { success: false, message: "Server Error" },
                { status: 500 },
            );
        }

        const update = await updateOrderPaymentStatus({ paypalID: orderID })
        if (!update || !('id' in update)) {
            if (!response) {
                return NextResponse.json(
                    { success: false, message: "Server Error" },
                    { status: 500 },
                );
            }
        }
        return NextResponse.json(
            { ...response.result },
            { status: 200 },
        );

        // return NextResponse.json(
        //     { success: false, message: "Payment unsuccessfull" },
        //     { status: 500 },
        // );
    } catch (error) {
        paypalLogger.error(error)
        return NextResponse.json(
            { success: false, message: "Server Error" },
            { status: 500 },
        );
    }
}