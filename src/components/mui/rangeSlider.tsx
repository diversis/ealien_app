import Box from "@mui/material/Box";
import Slider, {
    SliderTypeMap,
} from "@mui/material/Slider";
import Button from "@mui/material/Button";
import {
    ChangeEvent,
    ComponentPropsWithoutRef,
    Dispatch,
    SetStateAction,
    useCallback,
    useEffect,
    useState,
} from "react";
import { Input, Typography } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

interface RangeSliderProps
    extends ComponentPropsWithoutRef<
        OverridableComponent<SliderTypeMap<"span", {}>>
    > {
    setFilters: Dispatch<
        SetStateAction<{
            [key: string]: string | null;
        }>
    >;
    step?: number;
    label: string;
    rangeLimit?: [number, number];
    minValue: string | null;
    maxValue: string | null;
    handleChangeMinInput: (
        event: ChangeEvent<
            HTMLTextAreaElement | HTMLInputElement
        >,
    ) => void;
    handleChangeMaxInput: (
        event: ChangeEvent<
            HTMLTextAreaElement | HTMLInputElement
        >,
    ) => void;
    handleChangeRange: (
        event: Event,
        newValue: number | number[],
    ) => void;
    valuetext: (value: number) => string;
}

export default function RangeSlider({
    setFilters,
    minValue,
    maxValue,
    step = 10,
    label,
    rangeLimit = [0, 100],
    handleChangeMinInput,
    handleChangeMaxInput,
    handleChangeRange,
    valuetext,
    ...rest
}: RangeSliderProps) {
    return (
        <Box className="flex flex-col">
            <Slider
                getAriaLabel={() => "Price"}
                value={[
                    Number(minValue) || rangeLimit[0],
                    Number(maxValue) || rangeLimit[1],
                ]}
                step={step}
                onChange={handleChangeRange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                aria-labelledby="filters-price-label"
                min={rangeLimit[0]}
                max={rangeLimit[1]}
                {...rest}
            />
            <Box className="flex flex-row flex-wrap gap-2">
                <Box className="flex flex-row gap-2">
                    <Typography id={`range-${label}-from`}>
                        From
                    </Typography>
                    <Input
                        value={
                            Number(minValue) ||
                            rangeLimit[0]
                        }
                        onChange={handleChangeMinInput}
                        inputProps={{
                            step: { step },
                            min: rangeLimit[0],
                            max: rangeLimit[1],
                            type: "number",
                            "aria-labelledby": `range-${label}-from`,
                        }}
                        className="min-w-[3em] px-1"
                    />
                </Box>
                <Box className="flex flex-row gap-2">
                    <Typography id={`range-${label}-to`}>
                        to
                    </Typography>
                    <Input
                        value={
                            Number(maxValue) ||
                            rangeLimit[1]
                        }
                        onChange={handleChangeMaxInput}
                        inputProps={{
                            step: { step },
                            min: rangeLimit[0],
                            max: rangeLimit[1],
                            type: "number",
                            "aria-labelledby": `range-${label}-to`,
                        }}
                        className="min-w-[3em] px-1"
                    />
                </Box>
            </Box>
        </Box>
    );
}
