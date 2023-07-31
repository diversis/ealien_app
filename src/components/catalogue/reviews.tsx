import { SerializedNext } from "@/lib/prisma/types";
import {
    Box,
    Divider,
    Paper,
    Rating,
    Typography,
} from "@mui/material";
import { Review } from "@prisma/client";
import { m, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Reviews({
    reviews,
}: {
    reviews: SerializedNext<
        Review & {
            user: {
                name: string | null;
                image: string | null;
            };
        }
    >[];
}) {
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
        </div>
    );
}
