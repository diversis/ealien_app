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
import RangeSlider from "@/components/mui/rangeSlider";

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
                Number(event.target.value) >= 10
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
                Number(event.target.value) >= 10
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
                    maxPrice: max >= 10 ? null : "" + max,
                }));
            }
        },
        [setFilters],
    );

    return (
        <RangeSlider
            key="price-filter-range-slider"
            label="Price"
            minValue={minPrice}
            maxValue={maxPrice}
            setFilters={setFilters}
            rangeLimit={[0, 10]}
            step={0.1}
            handleChangeMaxInput={handleChangeMaxPrice}
            handleChangeMinInput={handleChangeMinPrice}
            handleChangeRange={handleChangePriceRange}
            valuetext={valuetext}
        />
    );
}
