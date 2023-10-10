"use client";
import { m } from "framer-motion";

import { Typography } from "@mui/material";
import { SerializedPrisma } from "@/lib/prisma/types";
import { Order } from "@prisma/client";
import OrdersTable from "@/components/tables/Orders";
import PageTransition from "@/app/pageTransition";

export default function Profile({
    orders,
}: {
    orders?: SerializedPrisma<Order>[];
}) {
    // const [render, setRender] = useState(false);
    // const [editable, setEditable] = useState(true);
    // useEffect(() => {
    //     setRender(true);
    // }, []);
    // if (!render) return null;
    return (
        <>
            <PageTransition>
                <div className="container flex grid-cols-2 flex-col-reverse gap-8  px-4 xl:grid">
                    <m.div
                        layout
                        className="flex flex-col items-center rounded-xl bg-primary-50/20 dark:bg-primary-900/20"
                    >
                        <Typography className="h3">
                            Your Orders
                        </Typography>
                        {!!orders && orders.length > 0 ? (
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
            </PageTransition>
        </>
    );
}
