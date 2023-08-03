import { serializeOrderWithItems } from '@/lib/prisma/serialization';

import { NextRequest, NextResponse } from "next/server";
import client from '@/lib/utils/paypal'
import { getOrderWithItemsById, updateOrderById } from "@/lib/prisma/order";

const paypal = require('@paypal/checkout-server-sdk');
const logger = require("@/lib/utils/logger");
const paypalLogger = logger.child({
    origin: "API paypal create order",
});

export async function POST(request: NextRequest) {
    try {
        const req = await request.json();
        paypalLogger.info('req: ')
        paypalLogger.info({ req })
        const orderId = req.data.orderID
        paypalLogger.info('order ID: ' + orderId)
        if (!orderId) {
            paypalLogger.error('no Order ID')
            return NextResponse.json(
                { success: false, message: "Order ID not provided" },
                { status: 500 },
            );
        }

        const order = await getOrderWithItemsById({
            id: orderId,
        });
        if ('error' in order) {
            const error = order.error
            return NextResponse.json(
                { ...typeof error === 'object' ? error : { error } },
                { status: 500 },
            );
        }

        if ('id' in order) {
            let paypalID: string | undefined
            if ('paypalID' in order && typeof order.paypalID === 'string') {
                paypalID = order.paypalID
            } else {

                // const serializedOrder = serializeOrderWithItems(order);
                const PaypalClient = client()
                //This code is lifted from https://github.com/paypal/Checkout-NodeJS-SDK
                const paypalRequest = new paypal.orders.OrdersCreateRequest()
                paypalRequest.headers['prefer'] = 'return=representation'
                paypalRequest.requestBody({
                    intent: 'CAPTURE',
                    purchase_units: [
                        {
                            description: `Order #${order.id}`,
                            amount: {
                                currency_code: 'USD',
                                value: Number(order.totalPrice).toFixed(2) + "",
                            },
                        },
                    ],
                })
                const response = await PaypalClient.execute(paypalRequest)
                if (response.statusCode !== 201) {
                    console.log("RES: ", response)
                    return NextResponse.json(
                        { success: false, message: "Server Error" },
                        { status: 500 },
                    );
                }
                if (!!response.result.id && typeof response.result.id === 'string') {
                    await updateOrderById({ id: order.id, })
                    paypalID = response.result.id
                    await updateOrderById({ id: orderId, paypalID })
                }
                paypalLogger.info({ response })

            }
            return NextResponse.json(
                { success: true, paypalID },
                { status: 200 },
            );
        }
        return NextResponse.json(
            { success: false, message: "Server Error" },
            { status: 500 },
        );
    } catch (error) {
        paypalLogger.error(error)
        return NextResponse.json(
            { success: false, message: "Server Error" },
            { status: 500 },
        );
    }
}