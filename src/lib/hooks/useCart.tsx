import { Product } from "@prisma/client";
import {
    create,
    StateCreator,
    StoreMutatorIdentifier,
} from "zustand";
import {
    persist,
    createJSONStorage,
} from "zustand/middleware";
import {
    CartItem,
    CompactProduct,
    SerializedPrisma,
} from "../prisma/types";

type Logger = <
    T,
    Mps extends [StoreMutatorIdentifier, unknown][] = [],
    Mcs extends [StoreMutatorIdentifier, unknown][] = [],
>(
    f: StateCreator<T, Mps, Mcs>,
    name?: string,
) => StateCreator<T, Mps, Mcs>;

type LoggerImpl = <T>(
    f: StateCreator<T, [], []>,
    name?: string,
) => StateCreator<T, [], []>;

const loggerImpl: LoggerImpl =
    (f, name) => (set, get, store) => {
        type T = ReturnType<typeof f>;
        const loggedSet: typeof set = (...a) => {
            set(...a);
            // console.log(
            //     ...(name ? [`${name}:`] : []),
            //     get(),
            // );
        };
        store.setState = loggedSet;

        return f(loggedSet, get, store);
    };

export const logger = loggerImpl as unknown as Logger;

type CartState = {
    items: CartItem[] | never;

    editable: boolean;

    show: boolean;
};

type CartAction = {
    addItem: ({
        product,
        qty,
        setQty,
    }: {
        product:
            | SerializedPrisma<Product>
            | SerializedPrisma<CompactProduct>;
        qty: number;
        setQty?: boolean;
    }) => void;
    addQty: (
        id: string,
        qty: number,
        setQty?: boolean,
    ) => void;
    setCountInStock: ({
        id,
        countInStock,
    }: {
        id: string;
        countInStock: number;
    }) => void;
    removeItem: (id: string) => void;
    setEditable: (state: boolean) => void;

    clearCart: () => void;

    toggleCart: (showState: boolean) => void;
};

const calculateTotal = ({ items }: { items: CartItem[] }) =>
    items.reduce(
        (sum, i) => sum + Number(i.price) * i.qty,
        0,
    );

export const useCart = create<CartState & CartAction>()(
    logger(
        persist(
            (set, get, state): CartState & CartAction => ({
                items: [],

                editable: true,
                show: false,

                addItem: ({
                    product,
                    qty,
                    setQty,
                }: {
                    product:
                        | SerializedPrisma<Product>
                        | SerializedPrisma<CompactProduct>;
                    qty: number;
                    setQty?: boolean;
                }) => {
                    if (!get().editable || qty < 1) {
                        return;
                    }
                    set((state): { items: CartItem[] } => {
                        const itemInCart = state.items.find(
                            (item) =>
                                item.id === product.id,
                        );

                        if (itemInCart) {
                            // if (setQty && qty <= 0)
                            //     return {
                            //         items: state.items.filter(
                            //             (item: SerializableCartItem) =>
                            //                 item.id !== product.id,
                            //         ),
                            //     };
                            return {
                                items: state.items.map(
                                    (item) =>
                                        item.id ===
                                        product.id
                                            ? {
                                                  ...item,
                                                  qty: setQty
                                                      ? qty
                                                      : product.countInStock &&
                                                        item.qty +
                                                            qty >
                                                            product.countInStock
                                                      ? product.countInStock
                                                      : item.qty +
                                                        qty,
                                              }
                                            : item,
                                ),
                            };
                        }

                        return {
                            items: [
                                ...state.items,
                                {
                                    id: product.id,
                                    name: product.name,
                                    price: product.price,
                                    image: product.image,
                                    rating: product.rating,
                                    countInStock:
                                        product.countInStock,
                                    qty:
                                        product.countInStock &&
                                        qty >
                                            product.countInStock
                                            ? product.countInStock
                                            : qty,
                                    currencyId:
                                        product.currencyId,
                                },
                            ],
                        };
                    });
                    // set((state): { total: number } => ({
                    //     total: calculateTotal({
                    //         items: get().items,
                    //     }),
                    // }));
                },
                setCountInStock: ({
                    id,
                    countInStock,
                }: {
                    id: string;
                    countInStock: number;
                }) => {
                    set((state): { items: CartItem[] } => {
                        const itemInCart =
                            state.items.findIndex(
                                (item) => item.id === id,
                            );
                        if (itemInCart) {
                            return {
                                items: state.items.map(
                                    (item) => {
                                        return item.id ===
                                            id
                                            ? {
                                                  ...item,
                                                  countInStock,
                                              }
                                            : {
                                                  ...item,
                                              };
                                    },
                                ),
                            };
                        }
                        return {
                            items: [...state.items],
                        };
                    });
                },
                addQty: (
                    id: string,
                    qty: number,
                    setQty?: boolean,
                ) => {
                    if (!get().editable) {
                        return;
                    }
                    set((state): { items: CartItem[] } => {
                        const itemInCart =
                            state.items.findIndex(
                                (item) => item.id === id,
                            );
                        if (itemInCart >= 0) {
                            if (
                                (setQty && qty <= 0) ||
                                state.items[itemInCart]
                                    .qty +
                                    qty <=
                                    0
                            )
                                // return {
                                //     items: state.items.filter(
                                //         (item: SerializableCartItem) =>
                                //             item.id !== id,
                                //     ),
                                // };
                                return {
                                    items: state.items.map(
                                        (item) => {
                                            return item.id ===
                                                id
                                                ? {
                                                      ...item,
                                                      qty: 0,
                                                  }
                                                : {
                                                      ...item,
                                                  };
                                        },
                                    ),
                                };

                            return {
                                items: state.items.map(
                                    (item) => {
                                        return item.id ===
                                            id
                                            ? {
                                                  ...item,
                                                  qty: setQty
                                                      ? qty <=
                                                        (state
                                                            .items[
                                                            itemInCart
                                                        ]
                                                            .countInStock ||
                                                            0)
                                                          ? qty
                                                          : state
                                                                .items[
                                                                itemInCart
                                                            ]
                                                                .countInStock ||
                                                            0
                                                      : item.qty +
                                                            qty <=
                                                        (state
                                                            .items[
                                                            itemInCart
                                                        ]
                                                            .countInStock ||
                                                            0)
                                                      ? item.qty +
                                                        qty
                                                      : state
                                                            .items[
                                                            itemInCart
                                                        ]
                                                            .countInStock ||
                                                        0,
                                              }
                                            : { ...item };
                                    },
                                ),
                            };
                        }
                        return {
                            items: [...state.items],
                        };
                    });
                },

                removeItem: (id: string): void => {
                    if (!get().editable) {
                        return;
                    }
                    set((state): { items: CartItem[] } => ({
                        items: state.items.filter(
                            (item: CartItem) =>
                                item.id !== id,
                        ),
                    }));
                },
                setEditable: (editableState) =>
                    set(() => ({
                        editable: editableState,
                    })),

                clearCart: () => {
                    if (!get().editable) {
                        return;
                    }
                    set((state) => ({ items: [] }));
                },

                toggleCart: (showState: boolean) => {
                    set({ show: showState });
                },
            }),
            {
                name: "cart-storage", // name of the item in the storage (must be unique)
                storage: createJSONStorage(
                    () => localStorage,
                ),
                partialize: (state) => ({
                    items: state.items,
                }),
            },
        ),
    ),
);
