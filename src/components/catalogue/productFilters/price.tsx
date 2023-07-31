import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import {
    ChangeEvent,
    Dispatch,
    SetStateAction,
    useCallback,
    useEffect,
    useState,
} from "react";
import { Input, Typography } from "@mui/material";

function valuetext(value: number) {
    return `$${value}`;
}

export default function FilterPrice({
    setFilters,
    minPrice,
    maxPrice,
}: {
    setFilters: Dispatch<
        SetStateAction<{
            [key: string]: string | null;
        }>
    >;
    minPrice: string | null;
    maxPrice: string | null;
}) {
    const handleChangeMinPrice = (
        event: ChangeEvent<
            HTMLTextAreaElement | HTMLInputElement
        >,
    ) => {
        setFilters((state) => ({
            ...state,
            minPrice:
                event.target.value === "" ||
                Number(event.target.value) <= 0 ||
                Number(event.target.value) >= 1000
                    ? null
                    : event.target.value,
        }));
    };

    const handleChangeMaxPrice = (
        event: ChangeEvent<
            HTMLTextAreaElement | HTMLInputElement
        >,
    ) => {
        setFilters((state) => ({
            ...state,
            maxPrice:
                event.target.value === "" ||
                Number(event.target.value) <= 0 ||
                Number(event.target.value) >= 1000
                    ? null
                    : event.target.value,
        }));
    };

    const handleChangePriceRange = useCallback(
        (event: Event, newValue: number | number[]) => {
            if (Array.isArray(newValue)) {
                const min = newValue[0];
                const max = newValue[1];
                setFilters((state) => ({
                    ...state,
                    minPrice: min <= 0 ? null : "" + min,
                    maxPrice: max >= 1000 ? null : "" + max,
                }));
            }
        },
        [setFilters],
    );

    return (
        <Box className="flex flex-col">
            <Slider
                getAriaLabel={() => "Price"}
                value={[
                    Number(minPrice) || 0,
                    Number(maxPrice) || 1000,
                ]}
                onChange={handleChangePriceRange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                aria-labelledby="filters-price-label"
                min={0}
                max={1000}
            />
            <Box className="flex flex-row flex-wrap gap-2">
                <Box className="flex flex-row gap-2">
                    <Typography id="price-from">
                        From
                    </Typography>
                    <Input
                        value={Number(minPrice) || 0}
                        onChange={handleChangeMinPrice}
                        inputProps={{
                            step: 10,
                            min: 0,
                            max: 1000,
                            type: "number",
                            "aria-labelledby": "price-from",
                            "aria-valuemax": 1000,
                            "aria-label": "price minimum",
                        }}
                    />
                </Box>
                <Box className="flex flex-row gap-2">
                    <Typography>to</Typography>
                    <Input
                        value={Number(maxPrice) || 1000}
                        onChange={handleChangeMaxPrice}
                        inputProps={{
                            step: 10,
                            min: 0,
                            max: 1000,
                            type: "number",
                            "aria-labelledby": "price-to",
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
}
