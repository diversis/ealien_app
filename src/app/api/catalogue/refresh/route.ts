import { getProductCountInStock } from "@/lib/prisma/product";
import { isCartItem } from "@/lib/prisma/typeguards";
import { CartItem } from "@/lib/prisma/types";
import { NextRequest, NextResponse } from "next/server";

const logger = require("@/lib/utils/logger");
const catalogueLogger = logger.child({
    origin: "API refresh products",
});

export async function POST(request: NextRequest) {
    // logger.info({ request });
    try {
        const req = await request.json();
        logger.info({ req });
        if (!("items" in req))
            return NextResponse.json(
                { data: { items: [] } },
                {
                    status: 200,
                },
            );
        const items = req.items.map((item: unknown) => {
            if (isCartItem(item)) {
                return {
                    ...item,
                    countInStock: getProductCountInStock({
                        id: item.id,
                    }),
                };
            }
        });

        return NextResponse.json(
            { items },
            {
                status: 200,
            },
        );
    } catch (error) {
        return NextResponse.json(
            { error: { message: "server error", error } },
            {
                status: 500,
            },
        );
    }
    return NextResponse.json(
        { error: { message: "server error" } },
        {
            status: 400,
        },
    );
}
