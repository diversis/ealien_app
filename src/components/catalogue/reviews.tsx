import { SerializableNext } from "@/lib/prisma/types";
import { Typography } from "@mui/material";
import { Review } from "@prisma/client";
import { m, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Reviews({
    reviews,
}: {
    reviews: SerializableNext<
        Review & {
            user: {
                name: string | null;
                image: string | null;
            };
        }
    >[];
}) {
    return (
        <div className="flex w-full flex-col items-center">
            <AnimatePresence>
                {reviews.map((review) => (
                    <m.div
                        key={`review-${review.id}`}
                        className="grid w-full grid-cols-[min-content_1fr]"
                    >
                        <div className="flex flex-col">
                            <Image
                                alt={`avatar-${review.user.name}`}
                                width={100}
                                height={100}
                                src={`${
                                    review.user.image ||
                                    "/logo2.png"
                                }`}
                            />
                            <div>
                                <Typography variant="body2">
                                    {review.user.name}
                                </Typography>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex flex-row gap-y-2">
                                <Typography variant="body2">
                                    {review.createdAt}
                                </Typography>
                            </div>
                        </div>
                    </m.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
