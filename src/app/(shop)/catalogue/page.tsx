import Catalogue from "./catalogue";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { Metadata, ResolvingMetadata } from "next";

import {
    Product,
    getBestProducts,
    getProductListItems,
} from "@/lib/prisma/product";
import {
    serializeCompactProduct,
    serializeProduct,
} from "@/lib/prisma/serialization";
import { SerializableNext } from "@/lib/prisma/types";

const logger = require("@/lib/utils/logger");
const catalogueLogger = logger.child({
    origin: "Catalogue Page",
});

export async function generateMetadata(
    {
        searchParams,
    }: {
        searchParams: {
            [key: string]: string | string[] | undefined;
        };
    },
    parent: ResolvingMetadata,
): Promise<Metadata> {
    // read route params
    const previousImages =
        (await parent)?.openGraph?.images || [];

    // optionally access and extend (rather than replace) parent metadata

    return {
        title: "AAlien | Catalogue",
        // openGraph: {
        // 	images: [
        // 		getImageLink({ feature }) || "",
        // 		...previousImages,
        // 	],
        // },
    };
}

export default async function Page({
    searchParams,
}: {
    searchParams: {
        [key: string]: string | string[] | undefined;
    };
}) {
    // Fetch data directly in a Server Component
    catalogueLogger.info({ searchParams });
    const session = await getServerSession(authOptions);

    const {
        page,
        searchKey,
        category,
        brand,
        color,
        minPrice,
        maxPrice,
    } = searchParams;

    const { productListItems, hasMore, count } =
        await getProductListItems({
            ...(page && typeof +page === "number"
                ? { page: +page }
                : {}),
            ...(searchKey && typeof searchKey === "string"
                ? { searchKey: searchKey }
                : {}),
            ...(category && typeof category === "string"
                ? { category: category }
                : {}),
            ...(brand && typeof brand === "string"
                ? { brand: brand }
                : {}),
            ...(color && typeof color === "string"
                ? { color: color }
                : {}),
            ...(minPrice && typeof +minPrice === "number"
                ? { minPrice: +minPrice }
                : {}),
            ...(maxPrice && typeof +maxPrice === "number"
                ? { maxPrice: +maxPrice }
                : {}),
        });

    const products: SerializableNext<Product>[] =
        productListItems
            .map(
                (
                    prod: Product,
                ): SerializableNext<Product> | null =>
                    serializeProduct(prod),
            )
            .filter(Boolean) as SerializableNext<Product>[];

    // catalogueLogger.info({ products });
    // catalogueLogger.info({ productListItems });

    if (products && products.length > 0) {
        // Forward fetched data to your Client Component
        return (
            <Catalogue
                products={products}
                hasMore={hasMore}
                count={count}
            />
        );
    }
}