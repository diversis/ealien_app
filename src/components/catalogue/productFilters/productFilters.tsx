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
        filters: { [key: string]: string };
    }) => void;
};

export default function ProductFilters({
    handleSearch,
}: FiltersProps) {
    const [filters, setFilters] = useState<{
        [key: string]: string;
    }>({});

    const debouncedFilters = useDebounce(filters, 500);

    useEffect(() => {
        console.log("debouncedFilters: ", debouncedFilters);
        handleSearch({ filters: debouncedFilters });
    }, [debouncedFilters, handleSearch]);

    useEffect(() => {
        console.log("filters: ", filters);
    }, [filters]);

    return (
        <Box className="flex flex-col gap-2">
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Box className="flex flex-row items-center gap-4">
                        <Typography>Category</Typography>

                        {"category" in filters ? (
                            <Button
                                variant="text"
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setFilters((state) => {
                                        const newState = {
                                            ...state,
                                        };
                                        delete newState.category;
                                        return newState;
                                    });
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
                        <Typography>Price</Typography>
                        <Typography>
                            {filters.price || null}
                        </Typography>
                        {"price" in filters ? (
                            <Button
                                variant="text"
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setFilters((state) => {
                                        const newState = {
                                            ...state,
                                        };
                                        delete newState.price;
                                        return newState;
                                    });
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
