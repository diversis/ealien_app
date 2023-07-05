"use client";
import {
    CompactProduct,
    SerializableNext,
} from "@/lib/prisma/types";
import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
} from "@mui/material";
import Star from "@mui/icons-material/star";
import { m, useInView } from "framer-motion";
import { OPACITY_VARIANTS } from "@/lib/constants";
import { useRef } from "react";

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
        >
            <MoCard className="relative">
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="150"
                        alt={product.name}
                        src={`/images/catalogue/${product.image}/512.webp`}
                    />
                    <CardContent className="absolute inset-x-0 bottom-0 flex flex-col bg-surface-50/50 backdrop-blur-sm">
                        <Box className="text-shadow flex flex-col flex-wrap justify-between">
                            <div className="flex flex-row flex-wrap items-center justify-between">
                                <Typography
                                    variant="h4"
                                    className="text-bold"
                                    gutterBottom
                                >
                                    {product.name}
                                </Typography>
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
                            </div>
                            <Typography
                                variant="body1"
                                gutterBottom
                            >
                                ${product.price}
                            </Typography>
                        </Box>
                    </CardContent>
                </CardActionArea>
            </MoCard>
        </m.div>
    );
}
