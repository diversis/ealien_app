import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Drawer from "@mui/material/Drawer";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { useCart } from "@/lib/hooks/use-cart";
import useWindowSize from "@/lib/hooks/use-window-size";
import ProductTable from "../tables/products";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import { SwipeableDrawer } from "@mui/material";

export default function Cart() {
    const [render, setRender] = useState(false);
    const {
        items,
        addItem,
        removeItem,
        clearCart,
        addQty,
        editable,
        show,
        toggle,
        setTotal,
    } = useCart((state) => ({
        items: state.items,
        addItem: state.addItem,
        removeItem: state.removeItem,
        clearCart: state.clearCart,
        addQty: state.addQty,
        editable: state.editable,
        show: state.show,
        toggle: state.toggleCart,
        setTotal: state.setTotal,
    }));
    const { isMobile, isTablet, isDesktop } =
        useWindowSize();
    const cartTotal = useMemo(
        () =>
            items.reduce(
                (sum, i) => sum + Number(i.price) * i.qty,
                0,
            ),
        [items],
    );

    useEffect(() => {
        setTotal(cartTotal);
    }, [cartTotal, setTotal]);

    return (
        <>
            <SwipeableDrawer
                classes={{
                    paper: "lg:max-w-[50vw] max-w-screen p-2",
                }}
                anchor={`${isDesktop ? "right" : "bottom"}`}
                open={show}
                onClose={() => {
                    toggle(false);
                }}
                onOpen={() => {
                    toggle(true);
                }}
                variant="temporary"
            >
                {items.length > 0 ? (
                    <>
                        <ProductTable
                            editable={editable}
                            items={items}
                            addQty={addQty}
                            removeItem={removeItem}
                            total={cartTotal}
                        />
                        {items.filter((i) => i.qty > 0)
                            .length > 0 && (
                            <Button
                                LinkComponent={Link}
                                href="/order/new"
                                onClick={() => {
                                    toggle(false);
                                }}
                                className="mx-auto text-base  lg:text-lg"
                                variant="contained"
                            >
                                Checkout
                            </Button>
                        )}
                    </>
                ) : (
                    <p>Cart is empty</p>
                )}
            </SwipeableDrawer>
            <Badge
                badgeContent={cartTotal.toFixed(2) || 0}
                className="mr-8 font-bold "
                max={99999.999}
            >
                <Button
                    onClick={() => {
                        toggle(true);
                    }}
                >
                    <ShoppingCartIcon />
                </Button>
            </Badge>
        </>
    );
}
