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
    getSerializableProduct,
} from "@/lib/prisma/product";
import {
    serializeCompactProduct,
    serializeProduct,
    serializeReview,
} from "@/lib/prisma/serialization";
import {
    ReviewWithAuthor,
    SerializedPrisma,
} from "@/lib/prisma/types";
import { redirect } from "next/navigation";
import { Review } from "@prisma/client";
import {
    getProductReviews,
    // getSerializableReviews,
} from "@/lib/prisma/review";
import { DOMAIN } from "@/lib/constants";

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
        title: "EAlien | " + product?.name || "",
        description: product?.description || "",
        openGraph: {
            images: [
                product?.image || "",
                ...previousImages,
            ],
            title: "EAlien | " + product?.name || "",
            description: product?.description || "",
            url: new URL(DOMAIN),
        },
        twitter: {
            images: [
                product?.image || "",
                ...previousImages,
            ],
            title: "EAlien | " + product?.name || "",
            description: product?.description || "",
        },
    };
}

export async function generateStaticParams() {
    const { productListItems } = await getProductListItems(
        {},
    );

    return productListItems.map((product) => ({
        product: product.id,
    }));
}

export default async function Page({
    params,
    searchParams,
}: ProductPageProps) {
    // Fetch data directly in a Server Component
    productLogger.info({ searchParams });
    const session = await getServerSession(authOptions);

    const product = await getProduct({
        id: params.product,
    });
    if (!product) {
        redirect("/catalogue");
    }
    const serializedProduct = serializeProduct(product);
    if (!serializedProduct) {
        redirect("/catalogue");
    }
    // const productReviews = await getProductReviews({
    //     productId: params.product,
    // });
    // const serializedReviews = productReviews.reviews.map(
    //     (review) =>
    //         serializeReview(
    //             review,
    //         ) as SerializedPrisma<ReviewWithAuthor>,
    // );
    // productLogger.info({ serializedReviews });
    // catalogueLogger.info({ productListItems });

    // Forward fetched data to your Client Component
    return (
        <ProductPage
            product={serializedProduct}
            // reviews={serializedReviews}
        />
    );
}
