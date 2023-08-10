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
import { useMutation } from "@tanstack/react-query";
import { camelCase } from "lodash";

import {
    CompactOrderItem,
    SerializedPrisma,
    CompactProduct,
} from "@/lib/prisma/types";
import {
    Order,
    OrderItem,
    ShippingAddress,
} from "@prisma/client";
import PaymentModal from "@/components/modals/paymentModal";
import { hasKey } from "@/lib/utils/tsutils";

const orderEndpoint = "/api/order";
const shippingEndpoint = "/api/shipping";
const shippingAddressFields = [
    "Address",
    "City",
    "Country",
    "Postal Code",
    "Shipping Price",
];

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
    const [shippingAddress, setShippingAddress] =
        useState<SerializedPrisma<ShippingAddress>>();

    const getAPIMutation = useMutation<
        { data: any },
        AxiosError,
        any,
        Response
    >((url): any => axios.get(url));

    const { totalPrice, orderItems: items } = order;
    const dateFormat = new Intl.DateTimeFormat("en-US");

    const getShippingAddress = useCallback(async () => {
        const res = await getAPIMutation.mutateAsync(
            `${shippingEndpoint}/?shippingAddressId=${order.shippingAddressId}`,
        );
        if (
            res &&
            "shippingAddress" in res.data &&
            typeof res.data.shippingAddress === "object" &&
            "id" in res.data.shippingAddress
        ) {
            setShippingAddress(res.data.shippingAddress);
        }
    }, [order, getAPIMutation]);

    const refreshOrder = useCallback(async () => {
        try {
            // await setRenderedOrder((state) => ({
            //     ...state,
            //     isPaid: true,
            //     paidAt: Date.now(),
            // }));
            const res = await getAPIMutation.mutateAsync(
                `${orderEndpoint}/?orderId=${order.id}`,
            );

            if (
                res &&
                "order" in res.data &&
                typeof res.data.order === "object" &&
                "id" in res.data.order
            ) {
                await setRenderedOrder(res.data.order);
            }
        } catch (error) {
            console.error(error);
        }
    }, [order, getAPIMutation]);

    useEffect(() => {
        getShippingAddress();
    }, [renderedOrder.shippingAddressId]);

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
                    className="flex h-min flex-col items-center gap-2 rounded-xl bg-primary-50/20 p-2 dark:bg-primary-900/20 lg:sticky lg:top-24"
                >
                    {shippingAddress ? (
                        <Paper className="w-full p-2">
                            <Box className="flex w-full flex-col">
                                {shippingAddressFields.map(
                                    (field) => {
                                        const camelField =
                                            camelCase(
                                                field,
                                            );
                                        if (
                                            hasKey(
                                                shippingAddress,
                                                camelField,
                                            )
                                        )
                                            return (
                                                <Box
                                                    key={`shipping-${field}`}
                                                    className="grid grid-cols-2 gap-2 py-1 [&:not(:last-of-type)]:border-b"
                                                >
                                                    <Typography variant="body1">
                                                        {
                                                            field
                                                        }
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        {
                                                            shippingAddress[
                                                                camelField
                                                            ]
                                                        }
                                                    </Typography>
                                                </Box>
                                            );
                                    },
                                )}
                            </Box>
                        </Paper>
                    ) : null}
                    {renderedOrder.isPaid ? (
                        <Paper className="w-full p-2">
                            <Box className="flex flex-row gap-2 rounded bg-tertiary-300 px-1 dark:bg-tertiary-800 lg:px-2">
                                <Typography variant="body1">
                                    Paid on{" "}
                                    {renderedOrder.paidAt
                                        ? dateFormat.format(
                                              new Date(
                                                  renderedOrder.paidAt,
                                              ),
                                          )
                                        : ""}
                                </Typography>
                            </Box>
                        </Paper>
                    ) : (
                        <Paper className="flex w-full flex-row items-center justify-between p-2">
                            <Typography variant="body1">
                                Not paid
                            </Typography>
                            <PaymentModal
                                order={order}
                                refreshOrder={refreshOrder}
                            />
                        </Paper>
                    )}
                    {renderedOrder.isDelivered ? (
                        <Paper className="w-full p-2">
                            <Box className="flex flex-row gap-2 rounded bg-tertiary-300 px-1 dark:bg-tertiary-800 lg:px-2">
                                <Typography variant="body1">
                                    Delivered on{" "}
                                    {renderedOrder.deliveredAt ||
                                        ""}
                                </Typography>
                            </Box>
                        </Paper>
                    ) : (
                        <Paper className="w-full flex-row items-center justify-between p-2">
                            <Typography variant="body1">
                                Not delivered
                            </Typography>
                        </Paper>
                    )}
                </m.div>
            </div>
        </>
    );
}
