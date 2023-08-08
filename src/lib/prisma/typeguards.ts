
import {
    CartItem,
    ReviewWithAuthor,
    SerializedPrisma,
} from "./types";

export const isCartItem = (
    item: unknown,
): item is CartItem => {
    if (!item || !isPlainObject(item)) return false;
    const cartItemProps = [
        { key: "id", type: "string" },
        { key: "rating", type: "number" },
        { key: "image", type: "string" },
        { key: "name", type: "string" },
        { key: "currencyId", type: "string" },
        { key: "countInStock", type: "number" || null },
        { key: "price", type: "number" },
    ];

    for (let { key, type } of cartItemProps) {
        if (
            !item.hasOwnProperty(key) ||
            typeof item[key] !== type
        ) return false;
    }
    return true;
};

export const isSerializedReview = (
    review: unknown,
): review is SerializedPrisma<ReviewWithAuthor> => {
    if (!review || !isPlainObject(review)) {
        // console.error(`not a plain object: ${review}`)
        return false
    };
    const reviewItemProps = [
        { key: "id", type: "string" },
        { key: "rating", type: "number" },
        { key: "content", type: "string" || null },
        { key: "productId", type: "string" },
        { key: "userId", type: "string" },
        { key: "createdAt", type: "number" },
        { key: "updatedAt", type: "number" },
        { key: "user", type: "object" },
    ];

    const authorProps = ["name", "image"];

    for (let { key, type } of reviewItemProps) {
        if (
            !review.hasOwnProperty(key) ||
            typeof review[key] !== type
        ) {
            // console.error(`not valid key: ${key}, ${type}, ${review}`)
            return false
        };

        if (key === 'user' && isPlainObject(review.user)) {
            for (let prop of authorProps) {
                if (!review.user.hasOwnProperty(prop) || typeof review.user[prop] !== 'string') {
                    // console.error(`not valid user key: ${typeof review.user[prop] === 'string'}, ${type}, ${prop}, ${Object.keys(review.user)}`)
                    return false
                }
            }
        }
    }
    return true;
};

interface PlainObject {
    hasOwnProperty<K extends string>(key: K): this is Record<K, unknown>

    // Object.hasOwn() is intended as a replacement for Object.hasOwnProperty(). See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn
    hasOwn<K extends string>(key: K): this is Record<K, unknown>
}

function isPlainObject(value: unknown): value is PlainObject {
    return !!value && typeof value === 'object' && !Array.isArray(value)
}
