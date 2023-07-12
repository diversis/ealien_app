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
            className="w-full"
        >
            <MoCard className="relative">
                <Link
                    href={`/catalogue/${product.id}`}
                    className="group/link relative w-72 max-w-full"
                >
                    <CardMedia className="w-full">
                        <Image
                            width={200}
                            height={400}
                            alt={product.name}
                            src={`/images/catalogue/${product.image}/512.webp`}
                            className="w-full object-cover transition-transform duration-300 group-hover/link:scale-105"
                        />
                    </CardMedia>
                </Link>
                <CardContent className="absolute inset-x-0 bottom-0 flex flex-col bg-surface-50/50 backdrop-blur-sm">
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
