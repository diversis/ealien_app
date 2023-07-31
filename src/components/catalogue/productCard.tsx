"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Rating,
    Typography,
} from "@mui/material";
import Star from "@mui/icons-material/Star";
import { m, useInView } from "framer-motion";

import {
    CompactProduct,
    SerializedNext,
} from "@/lib/prisma/types";
import { OPACITY_VARIANTS } from "@/lib/constants";
import { useCart } from "@/lib/hooks/use-cart";
import { useSnackbar } from "notistack";

export default function ProductCard({
    product,
    orderedId,
}: {
    product: SerializedNext<CompactProduct>;
    orderedId?: number;
}) {
    const ref = useRef(null);
    const isInView = useInView(ref);
    const { enqueueSnackbar, closeSnackbar } =
        useSnackbar();
    const { addItem } = useCart((state) => ({
        addItem: state.addItem,
    }));

    function handleAddToCartClick() {
        addItem(product, 1, false);

        enqueueSnackbar({
            message: `Added  to cart: ${product.name} for $${product.price}`,
            variant: "success",
            autoHideDuration: 6000,
        });
    }
    const isStockEmpty = product.countInStock
        ? product.countInStock <= 0
        : true;
    return (
        <m.div
            ref={ref}
            variants={OPACITY_VARIANTS}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            exit="hidden"
            className="z-0 aspect-square w-full transform-none place-self-center transition-[z-index] duration-500 ease-[cubic-bezier(1,0,1,0)] [&:is(:hover,:focus,:focus-within)]:z-20 [&:is(:hover,:focus,:focus-within)]:duration-0"
        >
            <Card className="group/card relative z-0 grid aspect-square w-full grid-cols-1 grid-rows-[1fr_auto] !overflow-visible bg-transparent ">
                <Link
                    href={`/catalogue/${product.id}`}
                    className="group/link peer/link relative grid aspect-square w-full max-w-full place-items-center border-2  border-transparent !p-0 [grid-area:1/1/3/2]"
                >
                    <CardMedia className="w-full overflow-hidden p-[2px] ">
                        <Image
                            width={200}
                            height={400}
                            alt={product.name}
                            src={`/images/catalogue/${product.image}/512.webp`}
                            className="w-full max-w-full rounded object-cover transition-transform duration-500 group-focus-within/card:scale-105 group-hover/card:scale-105 group-focus/card:scale-105"
                        />
                    </CardMedia>
                </Link>
                <CardContent className="transtion-all relative flex h-min w-full max-w-full flex-col rounded-t bg-surface-50/50 !p-0 backdrop-blur-sm duration-500 ease-out [grid-area:1/1/2/2] after:absolute after:inset-0 after:rounded-t after:opacity-0 after:shadow-inner after:shadow-surface-500 after:transition-opacity after:duration-500 after:ease-out group-focus-within/card:-translate-y-full group-focus-within/card:bg-surface-50 group-focus-within/card:after:opacity-100 group-hover/card:-translate-y-full group-hover/card:bg-surface-50 group-hover/card:after:opacity-100 group-focus/card:-translate-y-full group-focus/card:bg-surface-50 group-focus/card:after:opacity-100 dark:bg-surface-900/50 dark:group-focus-within/card:bg-surface-900  dark:group-hover/card:bg-surface-900 dark:group-focus/card:bg-surface-900">
                    <Box className="text-shadow flex flex-col flex-wrap justify-between gap-y-2 p-2">
                        <div className="flex flex-row items-center justify-between">
                            <Typography
                                variant="body1"
                                className="text-bold"
                                gutterBottom
                            >
                                {product.name}
                            </Typography>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                            <Typography
                                variant="body2"
                                className="align-middle !leading-none"
                            >
                                {product.rating}
                            </Typography>
                            <Rating
                                value={product.rating}
                                precision={0.1}
                                readOnly
                            />
                        </div>
                        <Typography variant="body1">
                            ${product.price}
                        </Typography>
                    </Box>
                </CardContent>
                <CardActions>
                    <Button
                        onClick={handleAddToCartClick}
                        variant="contained"
                        color="primary"
                        disabled={isStockEmpty}
                    >
                        Add to Cart
                    </Button>
                </CardActions>
            </Card>
        </m.div>
    );
}
