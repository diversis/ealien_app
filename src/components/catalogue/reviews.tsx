import { useEffect, useRef } from "react";
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

import { Review } from "@prisma/client";
import { SerializedPrisma } from "@/lib/prisma/types";
import { useState } from "react";

const reviewsPerPage = 10;

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
}): Promise<AxiosResponse<any, any>> {
    return await axios({
        method: "get",
        url: url,
    });
}

export default function Reviews({
    reviews,
    productId,
    reviewsCount,
}: {
    reviews: SerializedPrisma<
        Review & {
            user: {
                name: string | null;
                image: string | null;
            };
        }
    >[];
    productId: string;
    reviewsCount: number;
}) {
    const [page, setPage] = useState<number>(1);
    const [loadedReviews, setLoadedReviews] = useState<
        SerializedPrisma<
            Review & {
                user: {
                    name: string | null;
                    image: string | null;
                };
            }
        >[]
    >(reviews);
    const [count, setCount] =
        useState<number>(reviewsCount);
    const endOfList = useRef<HTMLDivElement | null>(null);
    const entry = useIntersectionObserver(endOfList, {});
    const reachedEnd = !!entry?.isIntersecting;

    useEffect(() => {
        if (reachedEnd && count > page * reviewsPerPage) {
        }
    }, [reachedEnd, count, page]);

    return (
        <div className="flex w-full flex-col items-center gap-y-4">
            <AnimatePresence>
                {reviews.map((review) => {
                    const date = new Date(review.createdAt);
                    const options: Intl.DateTimeFormatOptions =
                        {
                            weekday: "short",
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                        };
                    return (
                        <Paper
                            key={`review-${review.id}`}
                            className="grid w-full grid-cols-[auto_2px_1fr] items-center gap-4 p-2"
                            component={m.div}
                        >
                            <Box className="flex flex-col gap-2">
                                <Box>
                                    <Rating
                                        readOnly
                                        value={
                                            review.rating
                                        }
                                        precision={0.5}
                                    />
                                </Box>
                                <Box className="overflow-hidden">
                                    <Image
                                        alt={`avatar-${review.user.name}`}
                                        width={100}
                                        height={100}
                                        src={`${
                                            review.user
                                                .image ||
                                            "/logo2.png"
                                        }`}
                                        className="h-auto  w-24 rounded object-cover"
                                    />
                                </Box>
                                <div>
                                    <Typography variant="body2">
                                        {review.user.name}
                                    </Typography>
                                </div>
                            </Box>
                            <Divider
                                variant="middle"
                                orientation="vertical"
                            />
                            <Box className="grid h-full grid-cols-1 grid-rows-[auto_2px_1fr] gap-2 self-start">
                                <Box className="flex flex-row items-center gap-y-2">
                                    <div className="px-1">
                                        🕛
                                    </div>
                                    <div className="">
                                        <Typography variant="body2">
                                            {date.toLocaleDateString(
                                                "en-US",
                                                options,
                                            )}
                                        </Typography>
                                    </div>
                                </Box>
                                <Divider />
                                <Box className="">
                                    <Typography variant="body2">
                                        {review.content}
                                    </Typography>
                                </Box>
                            </Box>
                        </Paper>
                    );
                })}
            </AnimatePresence>
            <div
                ref={endOfList}
                className="h-0 w-full"
            ></div>
        </div>
    );
}
