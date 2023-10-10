import Image from "next/image";
import {
    Box,
    Divider,
    Paper,
    Rating,
    Typography,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import { Review } from "@prisma/client";
import { SerializedPrisma } from "@/lib/prisma/types";

export default function ReviewCard({
    review,
}: {
    review: SerializedPrisma<
        Review & {
            user: {
                name: string | null;
                image: string | null;
            };
        }
    >;
}) {
    const date = new Date(review.createdAt);
    const options: Intl.DateTimeFormatOptions = {
        weekday: "short",
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };

    return (
        <Paper className="grid w-full grid-cols-[auto_2px_1fr] items-center gap-4 p-2">
            <Box className="flex flex-col gap-2">
                <Box>
                    <Rating
                        readOnly
                        value={review.rating}
                        precision={0.5}
                    />
                </Box>
                <Box className="overflow-hidden">
                    <Image
                        alt={`avatar-${review.user.name}`}
                        width={96}
                        height={96}
                        src={`${
                            review.user.image ||
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
                        <AccessTimeIcon
                            width={16}
                            height={16}
                        />
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
}
