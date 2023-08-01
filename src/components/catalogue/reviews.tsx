import { useEffect, useRef, useState } from "react";
import {
    Box,
    Divider,
    Paper,
    Rating,
    Typography,
} from "@mui/material";
import { useIntersectionObserver } from "usehooks-ts";
import { m, AnimatePresence } from "framer-motion";
import Image from "next/image";
import axios, { AxiosError, AxiosResponse } from "axios";
import {
    type ZodString,
    z,
    ZodError,
    ZodObject,
} from "zod";
import { useInfiniteQuery } from "@tanstack/react-query";

import {
    ReviewWithAuthor,
    SerializedPrisma,
} from "@/lib/prisma/types";
import { isSerializedReview } from "@/lib/prisma/typeguards";
import Review from "./review";

const reviewsPerPage = 5;

const endpoint = "/api/reviews";

const getReviewsSchema = z.object({
    productId: z.string(),
    page: z.number(),
});

async function getReviews({
    // data,
    url,
}: {
    // data: { productId: string; page: string };
    url: string;
}): Promise<{
    reviews: SerializedPrisma<ReviewWithAuthor>[];
    nextId: string | null;
} | null> {
    try {
        // console.log("url: ", url);
        const res = await axios({
            method: "get",
            url: url,
        });
        // console.log("res: ", res.data);
        if (
            res &&
            "reviews" in res.data &&
            Array.isArray(res.data.reviews)
        ) {
            const resReviews = res.data.reviews.filter(
                (review: unknown) =>
                    isSerializedReview(review),
            );
            return res.data as {
                reviews: SerializedPrisma<ReviewWithAuthor>[];
                nextId: string | null;
            };
        }
    } catch (error) {
        // if (error instanceof AxiosError) {

        // }
        console.error(error);
    }
    return null;
}

export default function Reviews({
    reviews,
    productId,
    reviewsCount,
}: {
    reviews?: SerializedPrisma<ReviewWithAuthor>[];
    productId: string;
    reviewsCount?: number;
}) {
    // const [page, setPage] = useState<number>(1);
    // const [loadedReviews, setLoadedReviews] = useState<
    //     SerializedPrisma<
    //         Review & {
    //             user: {
    //                 name: string | null;
    //                 image: string | null;
    //             };
    //         }
    //     >[]
    // >(reviews);
    const {
        status,
        data: fetchedReviews,
        error,
        isFetching,
        isFetchingNextPage,
        isFetchingPreviousPage,
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage,
        hasPreviousPage,
    } = useInfiniteQuery({
        queryKey: [`stream-hydrate-reviews-${productId}`],
        queryFn: async ({
            pageParam = reviews
                ? reviews[reviews.length - 1]?.id
                : "",
        }) =>
            getReviews({
                url:
                    endpoint +
                    `?productId=${productId}` +
                    (pageParam
                        ? `&cursor=${pageParam}`
                        : ""),
            }),
        suspense: true,
        staleTime: 5 * 1000,
        // getPreviousPageParam: (firstPage) =>
        //     "previousId" in firstPage
        //         ? firstPage.previousId
        //         : undefined,
        getNextPageParam: (lastPage) =>
            lastPage && "nextId" in lastPage
                ? lastPage.nextId
                : undefined,
    });

    const endOfList = useRef<HTMLDivElement | null>(null);
    const entry = useIntersectionObserver(endOfList, {});
    const reachedEnd = !!entry?.isIntersecting;

    useEffect(() => {
        if (reachedEnd && hasNextPage) {
            fetchNextPage();
        }
    }, [reachedEnd, hasNextPage]);

    return (
        <div className="flex w-full flex-col items-center gap-y-4">
            <AnimatePresence>
                {!!reviews && reviews.length > 0
                    ? reviews.map((review) => (
                          <Review
                              key={`review-${review.id}`}
                              review={review}
                          />
                      ))
                    : null}

                {!!fetchedReviews
                    ? fetchedReviews.pages.flatMap(
                          (page) => {
                              if (!page) return null;
                              const { reviews } = page;
                              return reviews.map(
                                  (review) => (
                                      <Review
                                          key={`fetched-review-${review.id}`}
                                          review={review}
                                      />
                                  ),
                              );
                          },
                      )
                    : null}
            </AnimatePresence>
            <div
                ref={endOfList}
                className="h-0 w-full"
            ></div>
        </div>
    );
}
