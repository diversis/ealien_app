"use client";
import ProductTable from "@/components/tables/products";
import { useCart } from "@/lib/hooks/use-cart";
import {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";

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
import axios, { AxiosError, AxiosResponse } from "axios";

import {
    CompactOrderItem,
    SerializedPrisma,
    CompactProduct,
} from "@/lib/prisma/types";
import { Order, OrderItem } from "@prisma/client";
import PaymentModal from "@/components/modals/paymentModal";

async function getOrder({
    // data,
    url,
}: {
    // data: { productId: string; page: string };
    url: string;
}): Promise<{
    order: SerializedPrisma<Order> & {
        orderItems: (SerializedPrisma<CompactOrderItem> & {
            product: SerializedPrisma<CompactProduct>;
        })[];
    };
} | null> {
    try {
        // console.log("url: ", url);
        const res = await axios({
            method: "get",
            url: url,
        });
        if (
            res &&
            "order" in res.data &&
            typeof res.data.order === "object" &&
            "id" in res.data.order
        ) {
            return res.data.order as {
                order: SerializedPrisma<Order> & {
                    orderItems: (SerializedPrisma<CompactOrderItem> & {
                        product: SerializedPrisma<CompactProduct>;
                    })[];
                };
            };
        }
        return null;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const endpoint = "/api/order";

export default function OrderPage({
    order,
}: {
    order: SerializedPrisma<Order> & {
        orderItems: (SerializedPrisma<CompactOrderItem> & {
            product: SerializedPrisma<CompactProduct>;
        })[];
    };
}) {
    const [renderedOrder, setRenderedOrder] = useState<
        SerializedPrisma<Order> & {
            orderItems: (SerializedPrisma<CompactOrderItem> & {
                product: SerializedPrisma<CompactProduct>;
            })[];
        }
    >(order);
    const { totalPrice, orderItems: items } = order;
    const dateFormat = new Intl.DateTimeFormat("en-US");

    const refreshOrder = useCallback(async () => {
        const res = await getOrder({
            url: `${endpoint}/?orderId=${order.id}`,
        });
        if (res && "order" in res) {
            setRenderedOrder(res.order);
        }
    }, [order]);
    // const [editable, setEditable] = useState(true);
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
                    {order.shippingAddressId ? (
                        <Paper>
                            <Box className="flex flex-col">
                                {/* {Object.entries(order)} */}
                            </Box>
                        </Paper>
                    ) : null}
                    {order.isPaid ? (
                        <Paper className="w-full p-2">
                            <Box className="flex flex-row gap-2 rounded bg-tertiary-300 px-1 dark:bg-tertiary-800 lg:px-2">
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
                            <PaymentModal order={order} refreshOrder={refreshOrder}/>
                        </Paper>
                    )}
                    {order.isDelivered ? (
                        <Paper className="w-full p-2">
                            <Box className="flex flex-row gap-2 rounded bg-tertiary-300 px-1 dark:bg-tertiary-800 lg:px-2">
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
