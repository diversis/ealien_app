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
import { Typography } from "@mui/material";
import {
    CompactOrderItem,
    SerializableNext,
    CompactProduct,
} from "@/lib/prisma/types";
import { Order, OrderItem } from "@prisma/client";

export default function OrderPage({
    order,
}: {
    order: SerializableNext<Order> & {
        orderItems: (SerializableNext<CompactOrderItem> & {
            product: SerializableNext<CompactProduct>;
        })[];
    };
}) {
    const { totalPrice, orderItems: items } = order;
    const [render, setRender] = useState(false);
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
            </div>
        </>
    );
}
