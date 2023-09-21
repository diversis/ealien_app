"use client";
import ProductTable from "@/components/tables/Products";
import { useCart } from "@/lib/hooks/use-cart";
import { useEffect, useMemo, useState } from "react";

import { m } from "framer-motion";
import OrderForm from "@/components/form/order/create/OrderForm";
import Link from "next/link";
import { Typography } from "@mui/material";
import useCartTotal from "@/lib/hooks/use-cart-total";
import PageTransition from "@/app/pageTransition";

export default function NewOrder() {
    const {
        items,
        addItem,
        removeItem,
        clearCart,
        addQty,
        editable,
        show,
        toggle,
        setEditable,
    } = useCart((state) => ({
        items: state.items,
        addItem: state.addItem,
        removeItem: state.removeItem,
        clearCart: state.clearCart,
        addQty: state.addQty,
        editable: state.editable,
        setEditable: state.setEditable,
        show: state.show,

        toggle: state.toggleCart,
    }));
    const total = useCartTotal();

    const [render, setRender] = useState(false);
    // const [editable, setEditable] = useState(true);
    useEffect(() => {
        setRender(true);
    }, []);
    if (!render) return null;
    return (
        <>
            <PageTransition>
                <div className="container flex grid-cols-2 flex-col-reverse gap-8  px-4 xl:grid">
                    <m.div
                        layout
                        className="flex flex-col items-center gap-y-2 rounded-xl bg-primary-50/20 dark:bg-primary-900/20"
                    >
                        {items.length > 0 ? (
                            <>
                                <Typography className="h3">
                                    Your Order
                                </Typography>
                                <ProductTable
                                    editable={editable}
                                    items={items}
                                    addQty={addQty}
                                    removeItem={removeItem}
                                    total={total}
                                />
                            </>
                        ) : (
                            <div>
                                <Typography className="h5">
                                    Your cart is empty
                                </Typography>
                                <Link
                                    href="/catalogue"
                                    className="link-border font-semi-bold lg:nase p-1 text-sm xl:text-lg"
                                >
                                    Continue Shopping
                                </Link>
                            </div>
                        )}
                    </m.div>

                    <m.div
                        layout
                        className="grid h-min w-full grid-cols-1 place-items-start justify-items-center lg:sticky lg:top-24"
                    >
                        <OrderForm></OrderForm>
                    </m.div>
                </div>
            </PageTransition>
        </>
    );
}
