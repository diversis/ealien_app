import { useEffect, useState } from "react";
import {
    usePathname,
    ReadonlyURLSearchParams,
} from "next/navigation";
import { useDebounce } from "usehooks-ts";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Box,
    AccordionActions,
    Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import FilterCategories from "./categories";
import FilterPrice from "./price";
import FilterAccordion from "./filterAccordion";
import FilterRating from "./rating";

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
        </Box>
    );
}
