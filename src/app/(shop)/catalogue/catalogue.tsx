"use client";
import {
    Breadcrumbs,
    Button,
    Pagination,
    PaginationItem,
    SwipeableDrawer,
    Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import {
    usePathname,
    useSearchParams,
} from "next/navigation";
import {
    ReactNode,
    useCallback,
    useEffect,
    useState,
} from "react";
import Link from "next/link";
import { m, useInView } from "framer-motion";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { Product } from "@prisma/client";
import ProductCard from "@/components/catalogue/productCard";
import { SerializedNext } from "@/lib/prisma/types";

import {
    DRAWER_BLEEDING,
    STAGGER_VARIANTS,
} from "@/lib/constants";
import ProductFilters from "@/components/catalogue/productFilters/productFilters";
import useWindowSize from "@/lib/hooks/use-window-size";
import MUISwipeableDrawer from "@/components/mui/swipeableDrawer";

export default function Catalogue({
    products,
    data,
    hasMore,
    count,
}: {
    products: SerializedNext<Product>[];
    data?: JSON;
    hasMore: boolean;
    count: number;
}) {
    const router = useRouter();
    const pathname = usePathname();

    const searchParams = useSearchParams();
    const { isMobile, isDesktop } = useWindowSize();

    const handleSearch = useCallback(
        ({
            filters,
        }: {
            filters: { [key: string]: string | null };
        }) => {
            const searchString = new URLSearchParams(
                searchParams.toString(),
            );
            if (filters) {
                for (let [key, value] of Object.entries(
                    filters,
                )) {
                    if (!!value) {
                        searchString.set(key, value);
                    } else {
                        searchString.delete(key);
                    }
                }
            }

            router.push(`${pathname}?${searchString}`);
        },
        [searchParams, router, pathname],
    );

    const page =
        searchParams.has("page") &&
        typeof Number(searchParams.get("page")) === "number"
            ? Number(searchParams.get("page"))
            : 1;
    const category = searchParams.get("category") ?? null;
    // const nextLink = hasMore
    //     ? `${pathname}?${new URLSearchParams(
    //           searchParams.toString(),
    //       ).set("page", "" + (page + 1))}`
    //     : `${pathname}?${searchParams}`;

    //     const prevLink = page>1
    //     ? `${pathname}?${new URLSearchParams(
    //           searchParams.toString(),
    //       ).set("page", "" + (page - 1))}`
    //     : `${pathname}?${searchParams}`;

    // console.log(searchParams);

    // const [nextLink, setNextLink] = useState<string>(
    //     pathname + "?page=2",
    // );
    // const [prevLink, setPrevLink] =
    //     useState<string>(pathname);

    const getLinkWithSearchParams = useCallback(
        (linkPage: number | null) => {
            const searchString = new URLSearchParams(
                searchParams.toString(),
            );
            searchString.set("page", "" + linkPage || "1");
            // console.log(searchString);
            return `${pathname}?${searchString}`;
        },
        [searchParams, pathname],
    );
    // useEffect(() => {
    //     const page = parseInt(
    //         searchParams.get("page") || "1",
    //         10,
    //     );

    //     const getNextPage = () => {
    //         const searchString = new URLSearchParams(
    //             searchParams.toString(),
    //         );
    //         searchString.set("page", "" + (page + 1));
    //         // console.log(searchString);
    //         return `${pathname}?${searchString}`;
    //     };
    //     const getPrevPage = () => {
    //         const searchString = new URLSearchParams(
    //             searchParams.toString(),
    //         );
    //         searchString.set("page", "" + (page - 1));
    //         // console.log(searchString);
    //         return `${pathname}?${searchString}`;
    //     };
    //     setNextLink(getNextPage());
    //     if (page > 1) setPrevLink(getPrevPage());
    // }, [pathname, searchParams]);

    // console.log(products);
    // console.log(newsData);
    // if (products.length === 0) router.back();
    return (
        <div className="flex w-full flex-row">
            {isMobile ? (
                <MUISwipeableDrawer>
                    <ProductFilters
                        handleSearch={handleSearch}
                    />
                </MUISwipeableDrawer>
            ) : (
                <aside className="sticky top-28 flex h-min flex-grow basis-16 flex-col pl-2  lg:basis-72 lg:pl-4">
                    <ProductFilters
                        handleSearch={handleSearch}
                    />
                </aside>
            )}
            <div className="container flex flex-col gap-y-4 px-4  lg:mx-4 lg:gap-y-8">
                <Breadcrumbs className="self-start">
                    <Link href={`/catalogue/`}>
                        Catalogue
                    </Link>
                    {category ? (
                        <Link
                            href={`/catalogue/?category=${category}`}
                        >
                            {category}
                        </Link>
                    ) : null}
                </Breadcrumbs>
                {page > 1 || hasMore ? (
                    <div className="flex flex-row justify-center ">
                        <Pagination
                            count={Math.ceil(count / 16)}
                            renderItem={(item) => {
                                return (
                                    <PaginationItem
                                        component={Link}
                                        href={getLinkWithSearchParams(
                                            item.page,
                                        )}
                                        {...item}
                                    />
                                );
                            }}
                            page={page}
                        />
                    </div>
                ) : null}
                <m.div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4">
                    {Array.isArray(products) &&
                    products.length > 0 ? (
                        products.map((prod) => {
                            return (
                                <ProductCard
                                    key={`product-card-${prod.id}`}
                                    product={prod}
                                ></ProductCard>
                            );
                        })
                    ) : (
                        <Typography variant="body1">
                            Nothing found
                        </Typography>
                    )}
                </m.div>

                {page > 1 || hasMore ? (
                    <div className="flex flex-row justify-center ">
                        <Pagination
                            count={Math.ceil(count / 16)}
                            renderItem={(item) => {
                                return (
                                    <PaginationItem
                                        component={Link}
                                        href={getLinkWithSearchParams(
                                            item.page,
                                        )}
                                        {...item}
                                    />
                                );
                            }}
                            page={page}
                        />
                    </div>
                ) : null}
            </div>
        </div>
    );
}
