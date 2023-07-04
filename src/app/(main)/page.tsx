import Home from "./home";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";


import { Metadata } from "next";

import { getBestProducts } from "@/lib/prisma/product";
import { serializeCompactProduct } from "@/lib/prisma/serialization";



export default async function Page() {
    // Fetch data directly in a Server Component
    const session = await getServerSession(authOptions);
    const { productListItems } = await getBestProducts();
    const products = productListItems.map(prod => serializeCompactProduct(prod))
    // Forward fetched data to your Client Component
    return <Home products={products} />;
}
