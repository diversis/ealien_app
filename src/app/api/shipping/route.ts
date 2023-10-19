import { serializeShippingAddress } from '@/lib/prisma/serialization';
import { getShippingAddress } from "@/lib/prisma/shipping-address";
import { NextRequest, NextResponse } from "next/server";

const logger = require("@/lib/utils/logger");
const shippingLogger = logger.child({
    origin: "API shipping",
});

export async function GET(request: NextRequest) {
    try {
        const url = new URL(request.url)
        const { searchParams } = url

        const id = searchParams.get("shippingAddressId")
        if (id) {
            const shippingAddress = await getShippingAddress({ id })
            if (!shippingAddress) {
                return NextResponse.json(
                    { shippingAddress: {} },
                    { status: 200 },
                );
            }
            const serializedShippingAddress = serializeShippingAddress(shippingAddress)
            shippingLogger.info({ serializedShippingAddress });
            return NextResponse.json(
                { shippingAddress: serializedShippingAddress },
                { status: 200 },
            );
        }

    } catch (error) {
        shippingLogger.error(error);
        return NextResponse.json(
            { error },
            { status: 400 },
        );
    }
}