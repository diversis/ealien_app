import { serializeReview } from './../../../lib/prisma/serialization';
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import {
    type ZodString,
    z,
    ZodError,
    ZodObject,
} from "zod";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { createProductReview, getProductReviews } from "@/lib/prisma/review";

const logger = require("@/lib/utils/logger");
const reviewsLogger = logger.child({
    origin: "API reviews",
});

const getReviewsSchema = z.object({
    productId: z
        .string(),
    page: z.number(),
});

export async function GET(request: NextRequest) {
    try {
        const req = await request.json();
        if ("productId" in request && typeof request.productId === "string") {
            const productReviews = await getProductReviews({ productId: request.productId })
            const serializedReviews = productReviews.reviews.map(review => serializeReview(review))
            return NextResponse.json(
                { data: { reviews: serializedReviews, count: productReviews.count } },
                { status: 200 },
            );
        }
    }
    catch (error) {
        reviewsLogger.error(error);
        return NextResponse.json(
            { error },
            { status: 400 },
        );
    }
}
