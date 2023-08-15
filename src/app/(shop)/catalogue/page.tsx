import Catalogue from "./catalogue";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { Metadata, ResolvingMetadata } from "next";

import {
    Product,
    getProductListItems,
} from "@/lib/prisma/product";
import { serializeProduct } from "@/lib/prisma/serialization";
import { SerializedPrisma } from "@/lib/prisma/types";

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
        minRating,
        maxRating,
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
            ...(maxRating && typeof +maxRating === "number"
                ? { maxRating: +maxRating }
                : {}),
            ...(minRating && typeof +minRating === "number"
                ? { minRating: +minRating }
                : {}),
        });

    const products: SerializedPrisma<Product>[] =
        productListItems
            .map(
                (
                    prod: Product,
                ): SerializedPrisma<Product> | null =>
                    serializeProduct(prod),
            )
            .filter(Boolean) as SerializedPrisma<Product>[];

    // catalogueLogger.info({ products });
    // catalogueLogger.info({ productListItems });

    if (products) {
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
