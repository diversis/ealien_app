import Order from "./order";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { Metadata } from "next";


export default async function Page() {
    // Fetch data directly in a Server Component
    // const session = await getServerSession(authOptions);
    return <Order />;
}
