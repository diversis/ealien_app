import { useEffect, useState } from "react";
import { ReadonlyURLSearchParams } from "next/navigation";
import { useDebounce } from "usehooks-ts";
import { Box } from "@mui/material";

import FilterCategories from "./categories";
import FilterPrice from "./price";
import FilterAccordion from "./filterAccordion";
import FilterRating from "./rating";
import FilterSearch from "./search";

export type FiltersProps = {
    handleSearch: ({
        filters,
    }: {
        filters: { [key: string]: string | null };
    }) => void;
    searchParams: ReadonlyURLSearchParams;
};

export default function ProductFilters({
    handleSearch,
    searchParams,
}: FiltersProps) {
    const [filters, setFilters] = useState<{
        [key: string]: string | null;
    }>(Object.fromEntries(searchParams.entries()));

    const debouncedFilters = useDebounce(filters, 500);

    useEffect(() => {
        // console.log("debouncedFilters: ", debouncedFilters);
        handleSearch({
            filters: { ...debouncedFilters, page: "1" },
        });
    }, [debouncedFilters]);

    return (
        <Box className="flex flex-col gap-2">
            <FilterAccordion
                label="Category"
                isActive={
                    "category" in filters &&
                    !!filters.category
                }
                handleClearFilter={() =>
                    setFilters((state) => ({
                        ...state,
                        category: null,
                    }))
                }
            >
                <FilterCategories
                    setFilters={setFilters}
                    selectedCategory={filters.category}
                />
            </FilterAccordion>

            <FilterAccordion
                label="Price"
                isActive={
                    ("minPrice" in filters &&
                        !!filters.minPrice) ||
                    ("maxPrice" in filters &&
                        !!filters.maxPrice)
                }
                handleClearFilter={() =>
                    setFilters((state) => ({
                        ...state,
                        minPrice: null,
                        maxPrice: null,
                    }))
                }
            >
                <FilterPrice
                    setFilters={setFilters}
                    minPrice={filters.minPrice}
                    maxPrice={filters.maxPrice}
                />
            </FilterAccordion>

            <FilterAccordion
                label="Rating"
                isActive={
                    ("minRating" in filters &&
                        !!filters.minRating) ||
                    ("maxRating" in filters &&
                        !!filters.maxRating)
                }
                handleClearFilter={() =>
                    setFilters((state) => ({
                        ...state,
                        minRating: null,
                        maxRating: null,
                    }))
                }
            >
                <FilterRating
                    setFilters={setFilters}
                    minRating={filters.minRating}
                    maxRating={filters.maxRating}
                />
            </FilterAccordion>
            <FilterAccordion
                label="Search"
                isActive={
                    "searchKey" in filters &&
                    !!filters.searchKey
                }
                handleClearFilter={() =>
                    setFilters((state) => ({
                        ...state,
                        searchKey: null,
                    }))
                }
            >
                <FilterSearch
                    setFilters={setFilters}
                    searchKey={filters.searchKey}
                />
            </FilterAccordion>
        </Box>
    );
}
