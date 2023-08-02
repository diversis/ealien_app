import { serializeProduct } from "./serialization";
import type { Product, Category } from "@prisma/client";
import prisma from "./prisma";
import { Decimal } from "@prisma/client/runtime/library";
import { CompactProduct, SerializedPrisma } from "./types";
export type { Product, Category } from "@prisma/client";

const logger = require("@/lib/utils/logger");
const productLogger = logger.child({
    origin: "prisma product",
});

export type ProductWithCategories =
    SerializedPrisma<CompactProduct> & {
        categories: { name: string }[];
    };

export async function getProductCountInStock({
    id,
}: {
    id: string;
}): Promise<{
    countInStock: number | null;
} | null> {
    let prod;
    try {
        prod = await prisma.product.findUnique({
            // select: {
            //
            // },
            where: { id },
            select: {
                countInStock: true,
            },
        });
        return prod;
    } catch (error) {
        productLogger.error(error);
        return null;
    }
    return null;
}

export async function getProduct({
    id,
}: {
    id: string;
}): Promise<
    | (Product & {
        categories: { name: Category["name"] }[];
    })
    | null
> {
    let prod;
    try {
        prod = await prisma.product.findUnique({
            // select: {
            //
            // },
            where: { id },
            include: {
                categories: { select: { name: true } },
            },
        });
        return prod;
    } catch (error) {
        productLogger.error(error);
        return null;
    }
    return null;
}

export async function getProductListItems({
    page = 1,
    searchKey,
    category,
    brand,
    color,
    minPrice,
    maxPrice,
    minRating,
    maxRating
}: {
    page?: number;
    searchKey?: string;
    category?: string;
    brand?: string;
    color?: string;
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
    maxRating?: number;
}): Promise<{
    productListItems: Product[];
    page: number;
    hasMore: boolean;
    count: number;
}> {
    const reqColor = color;
    const reqBrand = brand;
    const reqCategory = category;
    const reqMaxPrice = maxPrice || undefined;
    const reqMinPrice = minPrice || 0;
    const reqMaxRating = maxRating || undefined;
    const reqMinRating = minRating || 0;
    const reqPage = page ? (page < 1 ? 1 : page) : 1;
    let data: Product[] = [];
    let count = 0;
    let searchString = "";
    // productLogger.info(
    //     "GET PRODUCT LIST  page   " +
    //         page +
    //         "   searchKey   " +
    //         searchKey +
    //         "   category   " +
    //         reqCategory +
    //         "   brand   " +
    //         reqBrand +
    //         "   color   " +
    //         reqColor +
    //         "   price   " +
    //         reqLowPrice +
    //         "-" +
    //         reqHighPrice +
    //         "price range: " +
    //         minPrice +
    //         "-" +
    //         maxPrice,
    // );
    if (typeof searchKey === "string" && searchKey) {
        searchString = searchKey.trim();
    }
    // if (typeof searchKey === "string" && searchKey) {
    //   productLogger.info("typeof searchKey === 'string' && searchKey.length > 0");
    //   data = await prisma.product.findMany({
    //     where: {
    //       name: {
    //         contains: searchKey,
    //         mode: "insensitive",
    //       },
    //     },

    //     skip: 16 * (page - 1),
    //     take: 17,
    //     orderBy: { updatedAt: "desc" },
    //   });
    //   productLogger.info(data);
    // }
    count = await prisma.product.count({
        where: {
            ...(searchString
                ? {
                    name: {
                        contains: searchString,
                        mode: "insensitive",
                    },
                }
                : {}),
            ...(reqColor
                ? {
                    color: {
                        equals: reqColor,
                    },
                }
                : {}),
            ...(reqBrand
                ? {
                    brand: {
                        equals: reqBrand,
                    },
                }
                : {}),
            ...(reqMaxPrice
                ? {
                    price: {
                        lte: reqMaxPrice,
                        gte: reqMinPrice,
                    },
                }
                : {
                    price: {
                        gte: reqMinPrice,
                    },
                }),
            ...(reqMaxRating
                ? {
                    rating: {
                        lte: reqMaxRating,
                        gte: reqMinRating,
                    },
                }
                : {
                    rating: {
                        gte: reqMinRating,
                    },
                }),
            ...(reqCategory
                ? {
                    categories: {
                        some: {
                            name: {
                                contains: reqCategory,
                                mode: "insensitive",
                            },
                        },
                    },
                }
                : {}),
        },
    });
    data = await prisma.product.findMany({
        where: {
            ...(searchString
                ? {
                    name: {
                        contains: searchString,
                        mode: "insensitive",
                    },
                }
                : {}),
            ...(reqColor
                ? {
                    color: {
                        equals: reqColor,
                    },
                }
                : {}),
            ...(reqBrand
                ? {
                    brand: {
                        equals: reqBrand,
                    },
                }
                : {}),
            ...(reqMaxPrice
                ? {
                    price: {
                        lte: reqMaxPrice,
                        gte: reqMinPrice,
                    },
                }
                : {
                    price: {
                        gte: reqMinPrice,
                    },
                }),
            ...(reqMaxRating
                ? {
                    rating: {
                        lte: reqMaxRating,
                        gte: reqMinRating,
                    },
                }
                : {
                    rating: {
                        gte: reqMinRating,
                    },
                }),
            ...(reqCategory
                ? {
                    categories: {
                        some: {
                            name: {
                                contains: reqCategory,
                                mode: "insensitive",
                            },
                        },
                    },
                }
                : {}),
        },
        // select: {
        //   id: true,
        //   name: true,
        //   description: true,
        //   price: true,
        //   image: true,
        // },
        skip: 16 * (reqPage - 1),
        take: 16,
        orderBy: { updatedAt: "desc" },
    });
    let hasMore = false;
    if (data.length === 16) {
        hasMore = true;
    }
    // productLogger.info({ data });
    return {
        productListItems: data,
        page: reqPage,
        hasMore,
        count,
    };
}

export async function getBrandProducts(): Promise<{
    productListItems: CompactProduct[];
}> {
    // productLogger.info("best products get \n ");
    let data: CompactProduct[] =
        await prisma.product.findMany({
            where: {
                brand: {
                    equals: "AAlien",
                },
            },
            select: {
                id: true,
                name: true,
                price: true,
                image: true,
                countInStock: true,
                rating: true,
                currencyId: true,
            },
            orderBy: { rating: "desc" },

        });
    // productLogger.info("aalien products: ", data);
    return { productListItems: data };
}

// : Promise<{ [id: string]: Pick<Product, "countInStock"> } | number|null>

export async function getProductsListCountInStock(
    id: string | string[],
) {
    // let data: { [id: string]: Pick<Product, "countInStock"> } = {};
    if (Array.isArray(id)) {
        try {
            const data = await prisma.product.findMany({
                where: {
                    id: {
                        in: id,
                    },
                },
                select: {
                    id: true,

                    countInStock: true,
                },
            });
            // productLogger.info("cart products: ", data);
            return { productListItems: data };
        } catch (error) {
            productLogger.error(
                `error finding products count in stock in db. query: ${id}`,
            );
            return {};
        }
    }
    const data = await prisma.product.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            countInStock: true,
        },
    });
    // productLogger.info("cart products: ", data);
    return { productListItems: data };

    return { data };
}

export async function getBestProducts(): Promise<{
    productListItems: CompactProduct[];
}> {
    // productLogger.info("best products get \n ");
    let data: CompactProduct[] =
        await prisma.product.findMany({
            orderBy: { rating: "desc" },
            select: {
                id: true,
                name: true,
                price: true,
                image: true,
                countInStock: true,
                rating: true,
                currencyId: true,
            },
            take: 12,
        });
    // productLogger.info("best products: ", data);
    return { productListItems: data };
}

export async function getCategoryProducts(
    category: string,
): Promise<{
    productListItems: CompactProduct[];
}> {
    const data = await prisma.product.findMany({
        where: {
            categories: category
                ? {
                    some: {
                        name: {
                            contains: category,
                            mode: "insensitive",
                        },
                    },
                }
                : {
                    none: {},
                },
        },
        select: {
            id: true,
            name: true,
            price: true,
            image: true,
            countInStock: true,
            rating: true,
            currencyId: true,
        },
        orderBy: { updatedAt: "desc" },
    });

    // productLogger.info(data);
    return { productListItems: data };
}

export function getProductListItemsCursor(id: string) {
    return prisma.product.findMany({
        // select: {
        //   id: true,
        //   name: true,
        //   description: true,
        //   price: true,
        //   image: true,
        // },
        cursor: {
            id,
        },
        skip: 1,
        take: 12,
        orderBy: { id: "asc" },
    });
}

export function getProductListItemsWithPage() {
    return prisma.product.findMany({
        select: {
            id: true,
            name: true,
            price: true,
            image: true,
        },
        orderBy: { updatedAt: "desc" },
    });
}

// export async function getProductFiltered(
//     filter: JSON,
//     reqPage: number | undefined,
//     fresh: boolean | undefined,
// ) {
//     filter.take = filter.take ? (filter.take > 49 ? 50 : filter.take + 1) : 17;
//     const page: number = reqPage ? (reqPage < 1 ? 1 : reqPage) : 1;
//     filter.skip = filter.take * (page - 1);
//     const data: Product[] = await prisma.product.findMany(filter);

//     productLogger.info("DATA:    ", data.length);
//     let hasMore = false;
//     if (data.length === filter.take) {
//         hasMore = true;
//         data.pop();
//     }
//     productLogger.info(
//         typeof filter +
//             "            GOT FILTER:         " +
//             filter.take +
//             "  " +
//             page,
//     );
//     return { productListItems: data, hasMore, fresh };
// }

export const getSerializableProduct = async ({
    id,
}: {
    id: string;
}): Promise<
    | (SerializedPrisma<Product> & {
        categories: { name: Category["name"] }[];
    })
    | null
> => {
    const prismaRes:
        | (Product & {
            categories: { name: Category["name"] }[];
        })
        | null = await getProduct({
            id,
        });
    if (prismaRes) {
        const product:
            | (SerializedPrisma<Product> & {
                categories: { name: Category["name"] }[];
            })
            | null = serializeProduct(prismaRes) as
            | (SerializedPrisma<Product> & {
                categories: { name: Category["name"] }[];
            })
            | null;
        return product;
    }
    return null;
};
