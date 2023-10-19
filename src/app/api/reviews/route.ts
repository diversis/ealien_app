
import { ReviewWithAuthor, SerializedPrisma } from '@/lib/prisma/types';
import { serializeReview } from '@/lib/prisma/serialization';
import { NextRequest, NextResponse } from "next/server";

import { getProductReviews } from "@/lib/prisma/review";
import { REVIEWS_PER_PAGE } from '@/lib/constants';

const logger = require("@/lib/utils/logger");
const reviewsLogger = logger.child({
    origin: "API reviews",
});

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

            const productReviews = await getProductReviews({ productId, ...!!cursor && { cursor: { id: cursor } }, reviewsPerPage: REVIEWS_PER_PAGE })
            if (!productReviews || productReviews.reviews.length < 1) {
                return NextResponse.json(
                    { reviews: [] },
                    { status: 200 },
                );
            }
            const serializedReviews = productReviews.reviews.map(review => serializeReview<ReviewWithAuthor>(review)).filter(Boolean) as SerializedPrisma<ReviewWithAuthor>[]
            if (!serializedReviews || serializedReviews.length < 1) {
                return NextResponse.json(
                    { reviews: [], success: false, message: "Error serializing product reviews" },
                    { status: 400 },
                );
            }
            const nextId = serializedReviews.length >= REVIEWS_PER_PAGE ? serializedReviews[REVIEWS_PER_PAGE - 1].id : undefined
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
            { reviews: [], error },
            { status: 400 },
        );
    }
}
