import { NextAuthOptions, getServerSession as getNextAuthServerSession } from "next-auth";
import { NextRequest } from "next/server";

export const getServerSession = (authOptions: NextAuthOptions) => {
    // return ()=>useNextAuthSession
    if (process.env.NEXT_PUBLIC_MOCK_NEXT_AUTH) {
        return ({
            user: {
                name: "admin",
                id: "0",
                image: null,
                email: "test@test.ts",
            }

        })

    } else {
        return getNextAuthServerSession(authOptions)
    }
}