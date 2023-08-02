"use client";
import { Suspense, useRef, useState } from "react";
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
import {
    Box,
    Breadcrumbs,
    Button,
    Skeleton,
    Typography,
    Paper,
} from "@mui/material";

import { SerializedPrisma } from "@/lib/prisma/types";
import { Category, Product, Review } from "@prisma/client";
import {
    OPACITY_VARIANTS,
    REVIEWS_PER_PAGE,
} from "@/lib/constants";
import ImageMagnifier from "@/components/shared/magnifier";

import Reviews from "@/components/catalogue/reviews";
import ReviewModal from "@/components/modals/reviewModal";
import SignInModal from "@/components/modals/signInModal";
import Link from "next/link";
import { useSnackbar } from "notistack";
import { useCart } from "@/lib/hooks/use-cart";
import { useSignInModal } from "@/lib/hooks/use-sign-in-modal";
import ReviewPlaceholder from "@/components/placeholder/review";
import ReviewCard from "@/components/catalogue/review";

export default function ProductPage({
    product,
    reviews,
}: {
    product: SerializedPrisma<Product> & {
        categories: { name: Category["name"] }[];
    };
    reviews?:
        | SerializedPrisma<
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

    const { visible, hideSignInModal, showSignInModal } =
        useSignInModal((state) => ({
            visible: state.visible,
            hideSignInModal: state.hideSignInModal,
            showSignInModal: state.showSignInModal,
        }));

    const { enqueueSnackbar, closeSnackbar } =
        useSnackbar();

    const { addItem } = useCart((state) => ({
        addItem: state.addItem,
    }));
    const isStockEmpty = product.countInStock
        ? product.countInStock <= 0
        : true;
    function handleAddToCartClick() {
        addItem(product, 1, false);

        enqueueSnackbar({
            message: `Added  to cart: ${product.name} for $${product.price}`,
            variant: "success",
            autoHideDuration: 6000,
        });
    }
    return (
        <m.section
            ref={ref}
            variants={OPACITY_VARIANTS}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            exit="hidden"
            className="grid w-full place-items-center"
        >
            <div className="container flex flex-col items-center gap-y-4 px-2 lg:gap-y-8">
                <Breadcrumbs className="self-start">
                    <Link href={`/catalogue/`}>
                        Catalogue
                    </Link>
                    <Link
                        href={`/catalogue/?category=${product.categories[0].name}`}
                    >
                        {product.categories[0].name}
                    </Link>
                </Breadcrumbs>
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
                        {isStockEmpty ? (
                            <Typography variant="body2">
                                Not in stock
                            </Typography>
                        ) : null}
                        <Typography variant="body2">
                            ${product.price}
                        </Typography>
                        <Button
                            variant="contained"
                            className=" "
                            title={
                                isStockEmpty
                                    ? "Product not in stock"
                                    : ""
                            }
                            color="secondary"
                            disabled={isStockEmpty}
                            onClick={handleAddToCartClick}
                        >
                            Add to Cart
                        </Button>
                    </div>
                </div>
                <div className="flex w-full flex-col">
                    <div className="my-2 flex w-full flex-row justify-between">
                        <Button
                            variant="contained"
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
                                product={product}
                            />
                        ) : (
                            <Button
                                variant="contained"
                                onClick={showSignInModal}
                                className="ml-auto"
                            >
                                Sign In
                            </Button>
                        )}
                    </div>
                    <Box className="flex w-full flex-col items-center gap-y-4">
                        {!!reviews && reviews.length > 0 ? (
                            reviews.map((review) => (
                                <ReviewCard
                                    key={`review-${review.id}`}
                                    review={review}
                                />
                            ))
                        ) : (
                            <div>
                                <Typography
                                    variant="body1"
                                    className="text-center"
                                >
                                    No reviews yet
                                </Typography>
                            </div>
                        )}
                        {!!reviews &&
                        reviews.length >=
                            REVIEWS_PER_PAGE ? (
                            <Suspense
                                fallback={
                                    <>
                                        {new Array(5).map(
                                            (_, id) => (
                                                <ReviewPlaceholder
                                                    key={`review-placeholder-${id}`}
                                                />
                                            ),
                                        )}
                                    </>
                                }
                            >
                                <Reviews
                                    reviews={reviews}
                                    productId={product.id}
                                />
                            </Suspense>
                        ) : null}
                    </Box>
                </div>
            </div>
        </m.section>
    );
}
