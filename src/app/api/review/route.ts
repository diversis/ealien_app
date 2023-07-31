import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import {
    type ZodString,
    z,
    ZodError,
    ZodObject,
} from "zod";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { createProductReview } from "@/lib/prisma/review";

const logger = require("@/lib/utils/logger");
const reviewLogger = logger.child({ origin: "API review" });

const formSchema = z.object({
    review: z
        .string()
        .min(3, "Review must include at least 3 characters")
        .max(1200, "Review too long (1200 characters max)"),
    rating: z.preprocess(
        (s) => Number(s),
        z
            .number()
            .min(0, "Rating can't be lower than 0")
            .max(5, "Rating can't be higher than 5"),
    ),
    productId: z.string(),
});

export async function POST(request: NextRequest) {
    try {
        const req = await request.json();

        const session = await getServerSession(authOptions);
        if (!session)
            return NextResponse.json(
                { message: "session was not provided" },
                { status: 401 },
            );

        formSchema.parse(req);

        reviewLogger.info("CREATE REVIEW", req);
        const review = await createProductReview({
            userId: session.user.id,
            content: req.review,
            rating: req.rating,
            productId: req.productId,
        });
        if ("error" in review) {
            return NextResponse.json(review.error, {
                status: 400,
            });
        }
        return NextResponse.json(
            { data: { review: review.reviewId } },
            { status: 200 },
        );
    } catch (e: unknown) {
        if (e instanceof ZodError) {
            reviewLogger.error(e.errors);

            // reviewLogger.info([...Object.values(e.errors)]);
            return NextResponse.json(e, { status: 400 });
        }
        reviewLogger.error(e);
        return NextResponse.json(
            { error: e },
            { status: 400 },
        );

        return;
    }
}
