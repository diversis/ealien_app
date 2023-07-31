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
    SerializedNext,
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
    total: number;
};

type CartAction = {
    addItem: (
        product:
            | SerializedNext<Product>
            | SerializedNext<CompactProduct>,
        qty: number,
        setQty?: boolean,
    ) => void;
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
    setTotal: (total: number) => void;
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
                total: 0,

                addItem: (
                    product:
                        | SerializedNext<Product>
                        | SerializedNext<CompactProduct>,
                    qty: number,
                    setQty: boolean = false,
                ) => {
                    if (!get().editable) {
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
                                    qty: 1,
                                    currencyId:
                                        product.currencyId,
                                },
                            ],
                        };
                    });
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

                clearCart: () =>
                    set((state) => ({ items: [] })),

                toggleCart: (showState: boolean) => {
                    set({ show: showState });
                },
                setTotal: (total: number) => {
                    set({ total: total });
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
