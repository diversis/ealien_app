"use client";
import ProductTable from "@/components/tables/products";
import { useCart } from "@/lib/hooks/use-cart";
import { useEffect, useMemo, useState } from "react";

import {
    AnimatePresence,
    LayoutGroup,
    m,
} from "framer-motion";
import OrderForm from "@/components/form/order/create/orderForm";
import Link from "next/link";
import {
    Box,
    Button,
    Paper,
    Typography,
} from "@mui/material";
import {
    CompactOrderItem,
    SerializedPrisma,
    CompactProduct,
} from "@/lib/prisma/types";
import { Order, OrderItem } from "@prisma/client";
import PaymentModal from "@/components/modals/paymentModal";

export default function OrderPage({
    order,
}: {
    order: SerializedPrisma<Order> & {
        orderItems: (SerializedPrisma<CompactOrderItem> & {
            product: SerializedPrisma<CompactProduct>;
        })[];
    };
}) {
    const { totalPrice, orderItems: items } = order;
    const [render, setRender] = useState(false);
    const dateFormat = new Intl.DateTimeFormat("en-US");
    // const [editable, setEditable] = useState(true);
    useEffect(() => {
        setRender(true);
    }, []);
    if (!render) return null;
    return (
        <>
            <div className="container flex grid-cols-2 flex-col-reverse gap-8  px-4 xl:grid">
                <m.div
                    layout
                    className="flex flex-col items-center rounded-xl bg-primary-50/20 dark:bg-primary-900/20"
                >
                    {items.length > 0 ? (
                        <>
                            <Typography variant="h3">
                                Your Order
                            </Typography>
                            <ProductTable
                                editable={false}
                                items={items}
                                total={totalPrice}
                            />
                        </>
                    ) : (
                        <div>
                            <Typography variant="h5">
                                This order is empty
                            </Typography>
                        </div>
                    )}
                </m.div>
                <m.div
                    layout
                    className="sticky top-24 flex h-min flex-col items-center gap-2 rounded-xl bg-primary-50/20 p-2 dark:bg-primary-900/20"
                >
                    {order.isPaid ? (
                        <Paper className="w-full p-2">
                            <Box className="flex flex-row gap-2 bg-tertiary-300 px-1 dark:bg-tertiary-800">
                                <Typography variant="body2">
                                    Paid on{" "}
                                    {order.paidAt
                                        ? dateFormat.format(
                                              new Date(
                                                  order.paidAt,
                                              ),
                                          )
                                        : ""}
                                </Typography>
                            </Box>
                        </Paper>
                    ) : (
                        <Paper className="flex w-full flex-row items-center justify-between p-2">
                            <Typography variant="body2">
                                Not paid
                            </Typography>
                            <PaymentModal order={order} />
                        </Paper>
                    )}
                    {order.isDelivered ? (
                        <Paper className="w-full p-2">
                            <Box className="flex flex-row gap-2 bg-tertiary-300 px-1 dark:bg-tertiary-800">
                                <Typography variant="body2">
                                    Delivered on{" "}
                                    {order.deliveredAt ||
                                        ""}
                                </Typography>
                            </Box>
                        </Paper>
                    ) : (
                        <Paper className="w-full flex-row items-center justify-between p-2">
                            <Typography variant="body2">
                                Not delivered
                            </Typography>
                        </Paper>
                    )}
                </m.div>
            </div>
        </>
    );
}
