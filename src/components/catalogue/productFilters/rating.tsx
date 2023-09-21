import {
    ChangeEvent,
    Dispatch,
    SetStateAction,
    useCallback,
} from "react";
import RangeSlider from "@/components/mui/rangeSlider";

function valuetext(value: number) {
    return `${value}`;
}

export default function FilterRating({
    setFilters,
    minRating,
    maxRating,
}: {
    setFilters: Dispatch<
        SetStateAction<{
            [key: string]: string | null;
        }>
    >;
    minRating: string | null;
    maxRating: string | null;
}) {
    const handleChangeMinRating = (
        event: ChangeEvent<
            HTMLTextAreaElement | HTMLInputElement
        >,
    ) => {
        setFilters((state) => ({
            ...state,
            minRating:
                event.target.value === "" ||
                Number(event.target.value) <= 0 ||
                Number(event.target.value) >= 5
                    ? null
                    : event.target.value,
        }));
    };

    const handleChangeMaxRating = (
        event: ChangeEvent<
            HTMLTextAreaElement | HTMLInputElement
        >,
    ) => {
        setFilters((state) => ({
            ...state,
            maxRating:
                event.target.value === "" ||
                Number(event.target.value) <= 0 ||
                Number(event.target.value) >= 5
                    ? null
                    : event.target.value,
        }));
    };

    const handleChangeRatingRange = useCallback(
        (event: Event, newValue: number | number[]) => {
            if (Array.isArray(newValue)) {
                const min = newValue[0];
                const max = newValue[1];
                setFilters((state) => ({
                    ...state,
                    minRating: min <= 0 ? null : "" + min,
                    maxRating: max >= 5 ? null : "" + max,
                }));
            }
        },
        [setFilters],
    );

    return (
        <RangeSlider
            key="price-filter-range-slider"
            label="Price"
            step={0.1}
            minValue={minRating}
            maxValue={maxRating}
            setFilters={setFilters}
            rangeLimit={[0, 5]}
            handleChangeMaxInput={handleChangeMaxRating}
            handleChangeMinInput={handleChangeMinRating}
            handleChangeRange={handleChangeRatingRange}
            valuetext={valuetext}
        />
    );
}
