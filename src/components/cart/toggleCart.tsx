"use client";

import {
    Dispatch,
    SetStateAction,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";
import axios, { AxiosError, AxiosResponse } from "axios";

import { Badge, Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { enqueueSnackbar } from "notistack";
import { throttle } from "lodash";

import { useCart } from "@/lib/hooks/use-cart";
import { CartItem } from "@/lib/prisma/types";
import { isCartItem } from "@/lib/prisma/typeguards";
import useCartTotal from "@/lib/hooks/use-cart-total";

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

export default function ToggleCart({
    toggleMobileMenu,
}: {
    toggleMobileMenu?: Dispatch<SetStateAction<boolean>>;
}) {
    const [render, setRender] = useState(false);

    const { items, toggle, setCountInStock } = useCart(
        (state) => ({
            items: state.items,
            toggle: state.toggleCart,
            setCountInStock: state.setCountInStock,
        }),
    );

    const cartTotal = useCartTotal();

    const refresh = useCallback(
        async () =>
            throttle(async () => {
                try {
                    const newCountInStock =
                        await getCountInStock({
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
                                            item.countInStock ||
                                            0,
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
                            autoHideDuration: 6000,
                        });
                    }
                    console.log(error);
                }
            }, 1000),
        [items, setCountInStock, enqueueSnackbar],
    );

    useEffect(() => {
        if (items && items.length > 0) refresh();
        setRender(true);
    }, []);

    if (!render) return null;

    return (
        <Badge
            badgeContent={cartTotal.toFixed(2) || 0}
            className="mr-8 font-bold "
            max={99999.99}
            data-testid="togglecart-badge"
        >
            <Button
                aria-label="cart"
                onClick={() => {
                    toggle(true);
                    if (toggleMobileMenu)
                        toggleMobileMenu(false);
                }}
                data-testid="togglecart-button"
            >
                <ShoppingCartIcon data-testid="togglecart-cart-icon" />
            </Button>
        </Badge>
    );
}
