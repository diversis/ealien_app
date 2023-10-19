"use client";
import {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";
import { useCart } from "./useCart";

export default function useCartTotal() {
    const { items } = useCart((state) => ({
        items: state.items,
    }));

    const cartTotal = useMemo(
        () =>
            items.reduce(
                (sum, i) => sum + Number(i.price) * i.qty,
                0,
            ),
        [items],
    );

    return cartTotal;
}
