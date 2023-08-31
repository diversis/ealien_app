"use client";
import {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";
import Link from "next/link";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useSnackbar } from "notistack";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import { SwipeableDrawer } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { useCart } from "@/lib/hooks/use-cart";
import useWindowSize from "@/lib/hooks/use-window-size";
import ProductTable from "../tables/products";

import { CartItem } from "@/lib/prisma/types";
import { isCartItem } from "@/lib/prisma/typeguards";
import useCartTotal from "@/lib/hooks/use-cart-total";

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

    const { isMobile, isTablet, isDesktop } =
        useWindowSize();

    return (
        <>
            <SwipeableDrawer
                classes={{
                    paper: "lg:max-w-[50vw] w-screen max-w-screen p-2 lg:min-w-[40rem] w-sreen",
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
                <IconButton
                    aria-label="close"
                    onClick={() => {
                        toggle(false);
                    }}
                    sx={{
                        position: "absolute",
                        right: 8,
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
                    <p>Cart is empty</p>
                )}
            </SwipeableDrawer>
        </>
    );
}
