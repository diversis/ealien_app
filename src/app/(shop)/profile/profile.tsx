"use client";
import { m } from "framer-motion";

import { Avatar, Typography } from "@mui/material";
import { SerializedPrisma } from "@/lib/prisma/types";
import { Order } from "@prisma/client";
import OrdersTable from "@/components/tables/Orders";
import PageTransition from "@/app/pageTransition";
import { useSession } from "@/lib/utils/useSession";
import AnimatedDiv from "@/components/shared/AnimatedDiv";

export default function Profile({
    orders,
}: {
    orders?: SerializedPrisma<Order>[];
}) {
    const { data: session, status } = useSession();
    const { email, image, name } = session?.user || {};
    return (
        <>
            <PageTransition>
                <div className="container flex flex-col gap-8 px-2">
                    <div className="flex flex-col gap-2 lg:gap-4">
                        <AnimatedDiv
                            delay={{ visible: 0.2 }}
                            direction="left"
                            className="flex w-fit flex-row flex-wrap items-center gap-2 lg:gap-4"
                        >
                            <Typography>
                                Hello, {name}!
                            </Typography>
                            <Avatar
                                data-testid="profile-user-avatar"
                                alt={name || "User"}
                                src={
                                    image || "/favicon.png"
                                }
                            />
                        </AnimatedDiv>
                        <AnimatedDiv
                            delay={{ visible: 0.3 }}
                            direction="right"
                            className="flex w-fit flex-row flex-wrap items-center"
                        >
                            <Typography>
                                Your email: {email}
                            </Typography>
                        </AnimatedDiv>
                    </div>
                    <div className="container flex grid-cols-2 flex-col-reverse gap-8  px-2 xl:grid">
                        <m.div
                            layout
                            className="flex flex-col items-center rounded-xl bg-primary-50/20 dark:bg-primary-900/20"
                        >
                            <Typography className="h3">
                                Your Orders
                            </Typography>
                            {!!orders &&
                            orders.length > 0 ? (
                                <>
                                    <OrdersTable
                                        orders={orders}
                                    />
                                </>
                            ) : (
                                <div>
                                    <Typography className="h5">
                                        This order is empty
                                    </Typography>
                                </div>
                            )}
                        </m.div>
                    </div>
                </div>
            </PageTransition>
        </>
    );
}
