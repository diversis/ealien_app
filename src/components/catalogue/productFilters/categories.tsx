import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { Dispatch, SetStateAction } from "react";

const CategoriesList = ["Guitars", "Violins", "Pianos"];

export default function FilterCategories({
    setFilters,
    selectedCategory,
}: {
    setFilters: Dispatch<
        SetStateAction<{
            [key: string]: string;
        }>
    >;
    selectedCategory: string | undefined;
}) {
    return (
        <Box className="flex flex-col">
            {CategoriesList.map((cat) => {
                return (
                    <Button
                        key={`filters-category-${cat}`}
                        variant="text"
                        onClick={() => {
                            setFilters((state) => ({
                                ...state,
                                category: cat.toLowerCase(),
                            }));
                        }}
                    >
                        {cat}
                        {selectedCategory ===
                        cat.toLowerCase() ? (
                            <ArrowLeftIcon />
                        ) : null}
                    </Button>
                );
            })}
        </Box>
    );
}
