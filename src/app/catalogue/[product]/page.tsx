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
} from "@/lib/prisma/serialization";
import { SerializableNext } from "@/lib/prisma/types";
import { redirect } from "next/navigation";

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
}): Promise<SerializableNext<Product> | null> => {
    const prismaRes:
        | (Product & {
              categories: { name: Category["name"] }[];
          })
        | null = await getProduct({
        id,
    });
    if (prismaRes) {
        const product: SerializableNext<Product> | null =
            serializeProduct(prismaRes);
        return product;
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
    // catalogueLogger.info({ products });
    // catalogueLogger.info({ productListItems });

    // Forward fetched data to your Client Component
    return <ProductPage product={product} />;
}
