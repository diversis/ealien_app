"use client";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
} from "@mui/material";
import Star from "@mui/icons-material/Star";
import { m, useInView } from "framer-motion";

import {
    CompactProduct,
    SerializableNext,
} from "@/lib/prisma/types";
import { OPACITY_VARIANTS } from "@/lib/constants";

export default function ProductCard({
    product,
    orderedId,
}: {
    product: SerializableNext<CompactProduct>;
    orderedId?: number;
}) {
    const ref = useRef(null);
    const isInView = useInView(ref);
    const MoCard = m(Card);
    return (
        <m.div
            ref={ref}
            variants={OPACITY_VARIANTS}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            exit="hidden"
            className="place-self-center "
        >
            <MoCard className="group/card relative h-72 w-72 overflow-visible bg-transparent">
                <Link
                    href={`/catalogue/${product.id}`}
                    className="group/link peer/link relative grid w-72 max-w-full grid-cols-1 grid-rows-1 border-2 border-transparent "
                >
                    <CardMedia className="w-full overflow-hidden p-[2px] [grid-area:1/1/2/2]">
                        <Image
                            width={200}
                            height={400}
                            alt={product.name}
                            src={`/images/catalogue/${product.image}/512.webp`}
                            className="w-full  rounded object-cover transition-transform duration-300 group-focus-within/link:scale-105 group-hover/link:scale-105 group-focus/link:scale-105"
                        />
                    </CardMedia>
                </Link>
                <CardContent className="absolute inset-x-0 bottom-0 z-20 flex flex-col rounded-b border-x border-b border-transparent bg-surface-50/50 backdrop-blur-sm transition-all duration-500 ease-out [grid-area:1/1/2/2] group-focus-within/card:z-20 group-focus-within/card:translate-y-full group-focus-within/card:border-surface-700/20 group-focus-within/card:bg-surface-50 group-hover/card:z-20 group-hover/card:translate-y-full group-hover/card:border-surface-700/20 group-hover/card:bg-surface-50 group-focus/card:z-20 group-focus/card:translate-y-full group-focus/card:border-surface-700/20 group-focus/card:bg-surface-50 dark:bg-surface-900/50 dark:group-focus-within/card:border-surface-300/20 dark:group-focus-within/card:bg-surface-900 dark:group-hover/card:border-surface-300/20 dark:group-hover/card:bg-surface-900 dark:group-focus/card:border-surface-300/20 dark:group-focus/card:bg-surface-900">
                    <Box className="text-shadow flex flex-col flex-wrap justify-between">
                        <div className="flex flex-row items-center justify-between">
                            <Typography
                                variant="h4"
                                className="text-bold"
                                gutterBottom
                            >
                                {product.name}
                            </Typography>
                        </div>
                        <div className="flex flex-row">
                            <Typography
                                variant="subtitle2"
                                gutterBottom
                            >
                                {product.rating}
                            </Typography>
                            <Star
                                strokeWidth="1"
                                className="h-4 w-4 fill-accent-400 stroke-surface-900 "
                            />
                        </div>
                        <Typography
                            variant="body1"
                            gutterBottom
                        >
                            ${product.price}
                        </Typography>
                    </Box>
                </CardContent>
            </MoCard>
        </m.div>
    );
}
