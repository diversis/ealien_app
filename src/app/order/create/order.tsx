import ProductTable from "@/components/tables/products";
import { useCart } from "@/lib/hooks/use-cart";
import { useEffect, useMemo, useState } from "react";

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import OrderForm from "@/components/forms/orderForm";
import Link from "next/link";

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
        total,
    } = useCart((state) => ({
        items: state.items,
        addItem: state.addItem,
        removeItem: state.removeItem,
        clearCart: state.clearCart,
        addQty: state.addQty,
        editable: state.editable,
        setEditable: state.setEditable,
        show: state.show,
        total: state.total,
        toggle: state.toggleCart,
    }));
    const [render, setRender] = useState(false);
    // const [editable, setEditable] = useState(true);
    useEffect(() => {
        setRender(true);
    }, []);
    if (!render) return null;
    return (
        <>
            <div className="container flex grid-cols-2 flex-col-reverse gap-8 overflow-hidden  px-4 xl:grid">
                <motion.div
                    layout
                    className="flex flex-col items-center rounded-xl bg-primary-50/20 dark:bg-primary-900/20"
                >
                    {items.length > 0 ? (
                        <>
                            <h3>Your Order</h3>
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
                            <h5>Your cart is empty</h5>
                            <Link
                                href="/catalogue"
                                className="link-border font-semi-bold lg:nase p-1 text-sm xl:text-lg"
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    )}
                </motion.div>

                <motion.div
                    layout
                    className="grid h-min w-full grid-cols-1 place-items-start justify-items-center"
                >
                    <OrderForm></OrderForm>
                </motion.div>
            </div>
        </>
    );
}
