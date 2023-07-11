import ProductPage from "./product";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { Metadata, ResolvingMetadata } from "next";

import {
    Category,
    Product,
    getBestProducts,
    getProduct,
    getProductListItems,
} from "@/lib/prisma/product";
import {
    serializeCompactProduct,
    serializeProduct,
    serializeReview,
} from "@/lib/prisma/serialization";
import { SerializableNext } from "@/lib/prisma/types";
import { redirect } from "next/navigation";
import { Review } from "@prisma/client";
import { getProductReviews } from "@/lib/prisma/review";

export type ProductPageProps = {
    params: { product: string };
    searchParams: {
        [key: string]: string | string[] | undefined;
    };
};

const logger = require("@/lib/utils/logger");
const productLogger = logger.child({
    origin: "Product Page",
});

export async function generateMetadata(
    { params, searchParams }: ProductPageProps,
    parent: ResolvingMetadata,
): Promise<Metadata> {
    // read route params
    const previousImages =
        (await parent)?.openGraph?.images || [];

    // optionally access and extend (rather than replace) parent metadata
    const product = await getSerializableProduct({
        id: params.product,
    });
    return {
        title: "AAlien | " + product?.name || "",
        // openGraph: {
        // 	images: [
        // 		getImageLink({ feature }) || "",
        // 		...previousImages,
        // 	],
        // },
    };
}

const getSerializableProduct = async ({
    id,
}: {
    id: string;
}): Promise<
    | (SerializableNext<Product> & {
          categories: { name: Category["name"] }[];
      })
    | null
> => {
    const prismaRes:
        | (Product & {
              categories: { name: Category["name"] }[];
          })
        | null = await getProduct({
        id,
    });
    if (prismaRes) {
        const product:
            | (SerializableNext<Product> & {
                  categories: { name: Category["name"] }[];
              })
            | null = serializeProduct(prismaRes) as
            | (SerializableNext<Product> & {
                  categories: { name: Category["name"] }[];
              })
            | null;
        return product;
    }
    return null;
};

const getSerializableReviews = async ({
    id,
}: {
    id: string;
}): Promise<
    | SerializableNext<
          Review & {
              user: {
                  name: string | null;
                  image: string | null;
              };
          }
      >[]
    | null
> => {
    const prismaRes:
        | (Review & {
              user: {
                  name: string | null;
                  image: string | null;
              };
          })[]
        | null = await getProductReviews({
        productId: id,
    });
    if (prismaRes) {
        const reviews = prismaRes
            .map(
                (
                    review: Review & {
                        user: {
                            name: string | null;
                            image: string | null;
                        };
                    },
                ) => serializeReview(review),
            )
            .filter(Boolean) as SerializableNext<
            Review & {
                user: {
                    name: string | null;
                    image: string | null;
                };
            }
        >[];
        return reviews;
    }
    return null;
};

export default async function Page({
    params,
    searchParams,
}: ProductPageProps) {
    // Fetch data directly in a Server Component
    productLogger.info({ searchParams });
    const session = await getServerSession(authOptions);

    const product = await getSerializableProduct({
        id: params.product,
    });
    if (!product) {
        redirect("/catalogue");
    }
    const reviews = await getSerializableReviews({
        id: params.product,
    });
    // catalogueLogger.info({ products });
    // catalogueLogger.info({ productListItems });

    // Forward fetched data to your Client Component
    return (
        <ProductPage product={product} reviews={reviews} />
    );
}
