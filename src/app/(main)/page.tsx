import Home from "./home";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";

import { Metadata } from "next";

import {
    Product,
    getBestProducts,
} from "@/lib/prisma/product";
import { serializeCompactProduct } from "@/lib/prisma/serialization";
import { SerializableNext } from "@/lib/prisma/types";

export default async function Page() {
    // Fetch data directly in a Server Component
    const session = await getServerSession(authOptions);
    const { productListItems } = await getBestProducts();
    const products = productListItems
        .map((prod) => serializeCompactProduct(prod))
        .filter(Boolean) as SerializableNext<Product>[]; // Forward fetched data to your Client Component
    return <Home products={products} />;
}
