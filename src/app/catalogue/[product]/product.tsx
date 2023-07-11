"use client";
import { useRef, useState } from "react";
import {
    AnimatePresence,
    m,
    useInView,
} from "framer-motion";
import axios, { AxiosError, AxiosResponse } from "axios";
import {
    Controller,
    FieldValues,
    SubmitHandler,
    useForm,
} from "react-hook-form";
import { useSession } from "next-auth/react";
import { Button, Typography } from "@mui/material";

import { SerializableNext } from "@/lib/prisma/types";
import { Category, Product, Review } from "@prisma/client";
import { OPACITY_VARIANTS } from "@/lib/constants";
import ImageMagnifier from "@/components/shared/magnifier";

import Reviews from "@/components/catalogue/reviews";
import ReviewModal from "@/components/catalogue/review-modal";
import SignInModal from "@/components/auth/sign-in-modal";

export default function ProductPage({
    product,
    reviews,
}: {
    product: SerializableNext<Product> & {
        categories: { name: Category["name"] }[];
    };
    reviews:
        | SerializableNext<
              Review & {
                  user: {
                      name: string | null;
                      image: string | null;
                  };
              }
          >[]
        | null;
}) {
    const { data: session, status } = useSession();
    const { email, image } = session?.user || {};
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
            <div className="container flex flex-col items-center gap-y-4 lg:gap-y-8">
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
                        <Button
                            variant="contained"
                            className="bg-primary-300"
                        >
                            Add to Cart
                        </Button>
                    </div>
                </div>
                <div className="flex w-full flex-col">
                    <div className="flex w-full flex-row justify-between">
                        <Button
                            variant="outlined"
                            disabled={
                                !(
                                    reviews &&
                                    reviews.length > 0
                                )
                            }
                            className="mr-auto"
                        >
                            Sort
                        </Button>
                        {email ? (
                            <ReviewModal
                                productName={product.name}
                                classNames={{
                                    trigger: "ml-auto",
                                }}
                            />
                        ) : (
                            <SignInModal></SignInModal>
                        )}
                    </div>
                    {reviews && reviews.length > 0 ? (
                        <Reviews reviews={reviews} />
                    ) : (
                        <div>
                            <Typography variant="body1">
                                No reviews yet
                            </Typography>
                        </div>
                    )}
                </div>
            </div>
        </m.section>
    );
}
