import { useEffect, useState } from "react";
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
import { useDebounce } from "usehooks-ts";

export type FiltersProps = {
    handleSearch: ({
        filters,
    }: {
        filters: { [key: string]: string | null };
    }) => void;
};

export default function ProductFilters({
    handleSearch,
}: FiltersProps) {
    const [filters, setFilters] = useState<{
        [key: string]: string | null;
    }>({});

    const debouncedFilters = useDebounce(filters, 500);

    useEffect(() => {
        console.log("debouncedFilters: ", debouncedFilters);
        handleSearch({ filters: debouncedFilters });
    }, [debouncedFilters, handleSearch]);

    return (
        <Box className="flex flex-col gap-2">
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Box className="flex flex-row items-center gap-4">
                        <Typography>Category</Typography>

                        {"category" in filters &&
                        !!filters.category ? (
                            <Button
                                variant="text"
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setFilters((state) => ({
                                        ...state,
                                        category: null,
                                    }));
                                }}
                            >
                                <ClearIcon />
                            </Button>
                        ) : null}
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    <FilterCategories
                        setFilters={setFilters}
                        selectedCategory={filters.category}
                    />
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Box className="flex flex-row items-center gap-4">
                        <Typography id="filters-price-label">
                            Price
                        </Typography>
                        <Typography>
                            {filters.price || null}
                        </Typography>
                        {"price" in filters ? (
                            <Button
                                variant="text"
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setFilters((state) => ({
                                        ...state,
                                        minPrice: null,
                                        maxPrice: null,
                                    }));
                                }}
                            >
                                <ClearIcon />
                            </Button>
                        ) : null}
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    <FilterPrice setFilters={setFilters} />
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}
