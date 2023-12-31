"use client";
import { Suspense, useRef, useState } from "react";
import { m, useInView } from "framer-motion";

// import { useSession } from "next-auth/react";
import {
    Box,
    Breadcrumbs,
    Button,
    Typography,
} from "@mui/material";

import { SerializedPrisma } from "@/lib/prisma/types";
import { Category, Product, Review } from "@prisma/client";
import { OPACITY_VARIANTS } from "@/lib/constants/variants";
import ImageMagnifier from "@/components/shared/Magnifier";
import Reviews from "@/components/catalogue/Reviews";
import ReviewModal from "@/components/modals/ReviewModal";
import Link from "next/link";
import { useSignInModal } from "@/lib/hooks/useSignInModal";
import ReviewPlaceholder from "@/components/placeholder/Review";
import AddToCart from "@/components/form/AddToCart";
import PageTransition from "@/app/pageTransition";
import { useSession } from "@/lib/utils/useSession";

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
    const [postedNewReview, setPostedNewReview] =
        useState(false);

    const { visible, hideSignInModal, showSignInModal } =
        useSignInModal((state) => ({
            visible: state.visible,
            hideSignInModal: state.hideSignInModal,
            showSignInModal: state.showSignInModal,
        }));
    return (
        <PageTransition>
            <m.section
                ref={ref}
                variants={OPACITY_VARIANTS}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                exit="hidden"
                className="grid w-full place-items-center"
            >
                <div className="container flex flex-col items-center gap-y-4 overflow-x-clip px-2 lg:gap-y-8">
                    <Breadcrumbs className="self-start">
                        <Link
                            href={`/catalogue/`}
                            className="link"
                        >
                            Catalogue
                        </Link>
                        <Link
                            href={`/catalogue/?category=${product.categories[0].name}`}
                            className="link"
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
                        <AddToCart product={product} />
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
                                    setPosted={
                                        setPostedNewReview
                                    }
                                />
                            ) : (
                                <Button
                                    variant="contained"
                                    onClick={
                                        showSignInModal
                                    }
                                    className="ml-auto"
                                >
                                    Sign In
                                </Button>
                            )}
                        </div>
                        <Box className="flex w-full flex-col items-center gap-y-4">
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
                                    productId={product.id}
                                    postedNewReview={
                                        postedNewReview
                                    }
                                />
                            </Suspense>
                        </Box>
                    </div>
                </div>
            </m.section>
        </PageTransition>
    );
}
