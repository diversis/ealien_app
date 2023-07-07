"use client";
import { useRef } from "react";
import { m, useInView } from "framer-motion";
import Image from "next/image";

import { SerializableNext } from "@/lib/prisma/types";
import { Product } from "@prisma/client";
import { OPACITY_VARIANTS } from "@/lib/constants";
import ImageMagnifier from "@/components/shared/magnifier";
import { Button, Typography } from "@mui/material";

export default function ProductPage({
    product,
}: {
    product: SerializableNext<Product>;
}) {
    const ref = useRef(null);
    const isInView = useInView(ref);
    return (
        <m.section
            ref={ref}
            variants={OPACITY_VARIANTS}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            exit="hidden"
            className="grid w-full place-items-center"
        >
            <div className="container flex flex-col items-center">
                <div className="grid w-full grid-cols-1 place-items-center lg:grid-cols-3">
                    <div className="flex h-full w-full max-w-[20rem] flex-col">
                        <ImageMagnifier
                            src={`/images/catalogue/${product.image}/1024.webp`}
                            width="200"
                            height="200"
                            alt={product.name}
                            key={`magnified-${product.name}`}
                            magnifierWidth={200}
                            magnifierHeight={200}
                            zoomLevel={2}
                        />
                    </div>
                    <article className="flex h-full w-full flex-col items-center gap-y-4">
                        <h1>{product.name}</h1>
                        <Typography
                            variant="body2"
                            className="w-full text-left"
                        >
                            {product.description}
                        </Typography>
                    </article>
                    <div className="flex flex-col items-center">
                        <Typography variant="body2">
                            ${product.price}
                        </Typography>
                        <Button>Add to Cart</Button>
                    </div>
                </div>
            </div>
        </m.section>
    );
}
