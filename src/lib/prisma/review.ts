import type { Review } from "@prisma/client";
import prisma from "./prisma";
import { SerializedNext } from "./types";
import { serializeReview } from "./serialization";
export type { Review } from "@prisma/client";
const logger = require("@/lib/utils/logger");
const productLogger = logger.child({
    origin: "prisma product",
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
        return { reviewId: review.id };
    }
}

export async function getProductReviews({
    productId,
    reqPage = 1,
    reviewsPerPage = 10
}: {
    productId: string;
    reqPage?: number;
    reviewsPerPage?: number
}): Promise<
    {
        reviews: (Review & {
            user: {
                name: string | null;
                image: string | null;
            };
        })[], count: number
    }
> {
    const page = reqPage ? (reqPage < 1 ? 1 : reqPage) : 1;
    const count = await prisma.review.count({
        where: {
            productId,
        }
    })
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
    return { reviews: data, count };
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
