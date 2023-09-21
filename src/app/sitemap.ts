import { DOMAIN } from "@/lib/constants";
import { getProductListItems } from "@/lib/prisma/product";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

    const { productListItems } = await getProductListItems({})
    const products = productListItems.map(({ id, createdAt }) => ({
        url: `${DOMAIN}/catalogue/${id}`,
        lastModified: createdAt.toISOString(),
    }));

    const routes = ["", "/catalogue", "/profile", "/order/create"].map((route) => ({
        url: `${DOMAIN}${route}`,
        lastModified: new Date().toISOString(),
    }));

    return [
        ...routes, ...products
    ];
}
