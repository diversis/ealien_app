import { useCallback, useEffect, useRef } from "react";
import { useIntersectionObserver } from "usehooks-ts";
import { AnimatePresence } from "framer-motion";
import axios from "axios";

import {
    useInfiniteQuery,
    useQueryClient,
} from "@tanstack/react-query";

import {
    ReviewWithAuthor,
    SerializedPrisma,
} from "@/lib/prisma/types";
import { isSerializedReview } from "@/lib/prisma/typeguards";
import ReviewCard from "./Review";
import ReviewPlaceholder from "@/components/placeholder/Review";
import { REVIEWS_PER_PAGE } from "@/lib/constants";

const endpoint = "/api/reviews";

async function getReviews({
    url,
}: {
    url: string;
}): Promise<{
    reviews: SerializedPrisma<ReviewWithAuthor>[];
    nextId: string | undefined;
} | null> {
    try {
        const res = await axios({
            method: "get",
            url: url,
        });

        if (
            res &&
            "reviews" in res.data &&
            Array.isArray(res.data.reviews)
        ) {
            const resReviews: SerializedPrisma<ReviewWithAuthor>[] =
                res.data.reviews.filter((review: unknown) =>
                    isSerializedReview(review),
                );
            return {
                reviews: resReviews,
                nextId: res.data.nextId as
                    | string
                    | undefined,
            };
        }
    } catch (error) {
        console.error(error);
    }
    return null;
}

export default function Reviews({
    reviews,
    productId,
    reviewsCount,
    postedNewReview,
}: {
    reviews?: SerializedPrisma<ReviewWithAuthor>[];
    productId: string;
    reviewsCount?: number;
    postedNewReview: boolean;
}) {
    const queryClient = useQueryClient();
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
        refetch,
    } = useInfiniteQuery({
        queryKey: [`stream-hydrate-reviews-${productId}`],
        queryFn: async ({
            pageParam
        }) =>
            getReviews({
                url:
                    endpoint +
                    `?productId=${productId}` +
                    (pageParam
                        ? `&cursor=${pageParam}`
                        : ""),
            }),
        initialPageParam:reviews
        ? reviews[reviews.length - 1]?.id
        : "",
        staleTime: 5 * 1000,
        getNextPageParam: (lastPage) =>
            lastPage && "nextId" in lastPage
                ? lastPage.nextId
                : undefined,
    });

    const endOfList = useRef<HTMLDivElement | null>(null);
    const entry = useIntersectionObserver(endOfList, {});
    const reachedEnd = !!entry?.isIntersecting;

    const refreshReviews = useCallback(() => {
        queryClient.invalidateQueries({
            queryKey: [
                `stream-hydrate-reviews-${productId}`,
            ],
        });
    }, [queryClient, productId]);

    useEffect(() => {
        if (reachedEnd && hasNextPage) {
            fetchNextPage();
        }
    }, [reachedEnd, hasNextPage, fetchNextPage]);
    useEffect(() => {
        refreshReviews();
    }, [postedNewReview, refreshReviews]);

    return (
        <>
            <AnimatePresence>
                {!!fetchedReviews
                    ? fetchedReviews.pages.flatMap(
                          (page) => {
                              if (!page) return null;
                              const { reviews } = page;
                              return reviews.map(
                                  (review) => (
                                      <ReviewCard
                                          key={`fetched-review-${review.id}`}
                                          review={review}
                                      />
                                  ),
                              );
                          },
                      )
                    : null}
                {isFetching || isFetchingNextPage
                    ? new Array(REVIEWS_PER_PAGE).map(
                          (_, id) => (
                              <ReviewPlaceholder
                                  key={`review-placeholder-${id}`}
                              />
                          ),
                      )
                    : null}
            </AnimatePresence>
            <div
                ref={endOfList}
                className="h-0 w-full"
            ></div>
        </>
    );
}
