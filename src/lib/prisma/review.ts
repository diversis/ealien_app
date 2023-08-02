import type { Prisma, Review } from "@prisma/client";
import prisma from "./prisma";
import { ReviewWithAuthor, SerializedPrisma } from "./types";
import { serializeReview } from "./serialization";
export type { Review } from "@prisma/client";
const logger = require("@/lib/utils/logger");
const reviewLogger = logger.child({
    origin: "prisma review",
});

export async function createProductReview({
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
        const updatedRating = await prisma.review.aggregate({
            where: {
                productId
            },
            _avg: {
                rating: true
            }
        })
        reviewLogger.info(updatedRating)
        await prisma.product.update({
            where: {
                id: productId,
            },
            data: {
                rating: Number(updatedRating._avg.rating),
            }
        })
        return { reviewId: review.id };
    }
}

export async function getProductReviews({
    productId,
    cursor,
    reviewsPerPage = 5
}: {
    productId: string;
    cursor?: { id: string };
    reviewsPerPage?: number
}): Promise<
    {
        reviews: ReviewWithAuthor[]
    }
> {
    // const count = await prisma.review.count({
    //     where: {
    //         productId,
    //     }
    // })
    reviewLogger.info('cursor: ' + cursor?.id)
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
        skip: !!cursor ? 1 : 0,
        ...!!cursor && { cursor },
        take: reviewsPerPage,
        orderBy: { updatedAt: "desc" },
    });
    // const hasMore: Boolean = !data.pop() ? false : true;
    return { reviews: data };
}

// export const getSerializableReviews = async ({
//     id,
// }: {
//     id: string;
// }): Promise<
//     | SerializableNext<
//         Review & {
//             user: {
//                 name: string | null;
//                 image: string | null;
//             };
//         }
//     >[]
//     | null
// > => {
//     const prismaRes:
//         | (Review & {
//             user: {
//                 name: string | null;
//                 image: string | null;
//             };
//         })[]
//         | null = await getProductReviews({
//             productId: id,
//         });
//     if (prismaRes) {
//         const reviews = prismaRes
//             .map(
//                 (
//                     review: Review & {
//                         user: {
//                             name: string | null;
//                             image: string | null;
//                         };
//                     },
//                 ) => serializeReview(review),
//             )
//             .filter(Boolean) as SerializableNext<
//                 Review & {
//                     user: {
//                         name: string | null;
//                         image: string | null;
//                     };
//                 }
//             >[];
//         return reviews;
//     }
//     return null;
// };
