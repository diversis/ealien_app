import type { Review } from "@prisma/client";
import prisma from "./prisma";
export type { Review } from "@prisma/client";
const logger = require("@/lib/utils/logger");
const productLogger = logger.child({
    origin: "prisma product",
});

export async function createProductReviews({
    userId,
    content,
    productId,
    rating,
}: {
    userId: string;
    content: string;
    productId: string;
    rating: number;
}) {
    try {
        const oldReview =
            await prisma.review.findFirstOrThrow({
                where: {
                    AND: [
                        {
                            userId: {
                                equals: userId,
                            },
                            productId: {
                                equals: productId,
                            },
                        },
                    ],
                },
            });
        return {
            error: {
                message:
                    "You have already posted a review for this product ",
            },
            data: oldReview.content,
        };
    } catch (NotFoundError) {
        const review = await prisma.review.create({
            data: {
                userId,
                content,
                productId,
                rating,
            },
        });
        return { review: review.id };
    }
}

export async function getProductReviews({
    productId,
    reqPage=1,
}: {
    productId: string;
    reqPage?: number;
}): Promise<
    (Review & {
        user: {
            name: string | null;
            image: string | null;
        };
    })[]
> {
    const page = reqPage ? (reqPage < 1 ? 1 : reqPage) : 1;
    const data: (Review & {
        user: {
            name: string | null;
            image: string | null;
        };
    })[] = await prisma.review.findMany({
        where: {
            productId,
        },
        include: {
            user: { select: { name: true, image: true } },
        },
        skip: 10 * (page - 1),
        take: 10,
        orderBy: { updatedAt: "desc" },
    });
    // const hasMore: Boolean = !data.pop() ? false : true;
    return data;
}
