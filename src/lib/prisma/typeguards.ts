import { CartItem } from "./types";

export const isCartItem = (
    item: unknown,
): item is CartItem => {
    if (!item || typeof item !== "object") return false;
    const cartItemProps = [
        "id",
        "price",
        "image",
        "rating",
        "name",
        "countInStock",
    ];

    for (let prop of cartItemProps) {
        if (!(prop in item)) return false;
    }
    return true;
};
