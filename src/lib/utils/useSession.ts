import { useSession as useNextAuthSession } from "next-auth/react";

export const useSession = () => {
    // return ()=>useNextAuthSession
    if (process.env.NEXT_PUBLIC_MOCK_NEXT_AUTH) {
        return () =>
        ({
            data: {
                user: {
                    name: "admin",
                    id: "0",
                    image: null,
                    email: "test@test.ts",
                }
            },
            status: "authenticated"
        })

    } else {
        return useNextAuthSession
    }
}