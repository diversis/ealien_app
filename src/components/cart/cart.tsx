"use client";

import Link from "next/link";

import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { SwipeableDrawer, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { useCart } from "@/lib/hooks/use-cart";
import ProductTable from "../tables/Products";

import useCartTotal from "@/lib/hooks/use-cart-total";
import { useWindowSize } from "usehooks-ts";

export default function Cart() {
    const {
        items,
        removeItem,
        addQty,
        editable,
        show,
        toggle,
    } = useCart((state) => ({
        items: state.items,
        removeItem: state.removeItem,
        addQty: state.addQty,
        editable: state.editable,
        show: state.show,
        toggle: state.toggleCart,
    }));

    const cartTotal = useCartTotal();

    const { width } = useWindowSize();

    return (
        <>
            <SwipeableDrawer
                classes={{
                    paper: "lg:max-w-[50vw] w-screen max-w-screen py-3 pl-0.5 pr-1.5 lg:p-2 lg:min-w-[40rem] w-sreen",
                }}
                anchor={`${
                    width >= 1024 ? "right" : "bottom"
                }`}
                open={show}
                onClose={() => {
                    toggle(false);
                }}
                onOpen={() => {
                    toggle(true);
                }}
                variant="temporary"
            >
                <IconButton
                    aria-label="close"
                    onClick={() => {
                        toggle(false);
                    }}
                    sx={{
                        position: "absolute",
                        ...(width > 1024
                            ? { right: 8 }
                            : { left: 4 }),
                        top: 8,
                        zIndex: 9000,
                        color: (theme) =>
                            theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
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
                                href="/order/create"
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
                    <Typography className="inline-flex pl-12 pr-4 text-center">
                        Cart is empty
                    </Typography>
                )}
            </SwipeableDrawer>
        </>
    );
}
