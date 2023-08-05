import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
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
import {
    useInfiniteQuery,
    useQueryClient,
} from "@tanstack/react-query";

import {
    ReviewWithAuthor,
    SerializedPrisma,
} from "@/lib/prisma/types";
import { isSerializedReview } from "@/lib/prisma/typeguards";
import ReviewCard from "./review";
import ReviewPlaceholder from "@/components/placeholder/review";
import { REVIEWS_PER_PAGE } from "@/lib/constants";

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
    nextId: string | undefined;
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
    postedNewReview,
}: {
    reviews?: SerializedPrisma<ReviewWithAuthor>[];
    productId: string;
    reviewsCount?: number;
    postedNewReview: boolean;
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
    }, [postedNewReview]);

    return (
        <>
            <AnimatePresence>
                {/* {!!reviews && reviews.length > 0
                    ? reviews.map((review) => (
                          <Review
                              key={`review-${review.id}`}
                              review={review}
                          />
                      ))
                    : null} */}

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
