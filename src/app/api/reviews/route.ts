import { ReviewWithAuthor, SerializedPrisma } from '@/lib/prisma/types';
import { serializeReview } from '@/lib/prisma/serialization';
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import {
    type ZodString,
    z,
    ZodError,
    ZodObject,
} from "zod";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Review, createProductReview, getProductReviews } from "@/lib/prisma/review";

const logger = require("@/lib/utils/logger");
const reviewsLogger = logger.child({
    origin: "API reviews",
});

const getReviewsSchema = z.object({
    productId: z
        .string(),
    page: z.number(),
});

const reviewsPerPage = 5

export async function GET(request: NextRequest) {
    try {

        const url = new URL(request.url)
        const { searchParams } = url

        const productId = searchParams.get("productId")
        const cursor = searchParams.get("cursor")
        reviewsLogger.info("productId");
        reviewsLogger.info(productId);
        reviewsLogger.info("cursor");
        reviewsLogger.info(cursor);
        if (productId) {

            const productReviews = await getProductReviews({ productId, ...!!cursor && { cursor: { id: cursor } }, reviewsPerPage })
            if (!productReviews) {
                return NextResponse.json(
                    {},
                    { status: 400 },
                );
            }
            const serializedReviews = productReviews.reviews.map(review => serializeReview<ReviewWithAuthor>(review)).filter(Boolean) as SerializedPrisma<ReviewWithAuthor>[]
            if (!serializedReviews || serializedReviews.length < 1) {
                return NextResponse.json(
                    {},
                    { status: 400 },
                );
            }
            const nextId = serializedReviews.length >= reviewsPerPage ? serializedReviews[reviewsPerPage - 1].id : undefined
            reviewsLogger.info({ serializedReviews });
            return NextResponse.json(
                { reviews: serializedReviews, nextId },
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
