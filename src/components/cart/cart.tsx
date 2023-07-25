"use client";
import {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";
import Image from "next/image";
import Link from "next/link";
import Drawer from "@mui/material/Drawer";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useSnackbar } from "notistack";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import { SwipeableDrawer } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { useCart } from "@/lib/hooks/use-cart";
import useWindowSize from "@/lib/hooks/use-window-size";
import ProductTable from "../tables/products";

import { CartItem } from "@/lib/prisma/types";
import { isCartItem } from "@/lib/prisma/typeguards";

const endpoint = "/api/catalogue/refresh/";

async function getCountInStock({
    data,
    url,
}: {
    data: { items: CartItem[] };
    url: string;
}): Promise<AxiosResponse<any, any>> {
    return await axios({
        method: "post",
        url: url,
        data: data,
    });
}

export default function Cart() {
    const [render, setRender] = useState(false);
    const { enqueueSnackbar, closeSnackbar } =
        useSnackbar();
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
        setCountInStock,
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
        setCountInStock: state.setCountInStock,
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

    const refresh = useCallback(async () => {
        try {
            const newCountInStock = await getCountInStock({
                data: { items },
                url: endpoint,
            });
            if (
                "items" in newCountInStock &&
                Array.isArray(newCountInStock.items)
            ) {
                newCountInStock.items.map(
                    (item: unknown) => {
                        if (isCartItem(item))
                            setCountInStock({
                                id: item.id,
                                countInStock:
                                    item.countInStock || 0,
                            });
                    },
                );
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error);
                enqueueSnackbar({
                    message: `There was an error updating your cart`,
                    variant: "error",
                });
            }
            console.log(error);
        }
    }, []);

    useEffect(() => {
        // if (items && items.length > 0) refresh();
        setRender(true);
    }, []);
    return (
        <>
            <SwipeableDrawer
                classes={{
                    paper: "lg:max-w-[50vw] max-w-screen p-2 min-w-[40rem] w-sreen",
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
            {render ? (
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
            ) : null}
        </>
    );
}
