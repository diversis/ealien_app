import Image from "next/image";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import { Controller, useController } from "react-hook-form";
import type {
    FieldValues,
    FieldPath,
    UseControllerProps,
} from "react-hook-form";
import Chip from "@mui/material/Chip";
import { Typography } from "@mui/material";
import { countries } from "./countries";

type InputProps<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName>;

export const ControlledCountrySelect = <
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>,
>({
    name,
    control,
    label,
}: InputProps<TFieldValues, TName> & {
    label?: string;
}) => {
    const { field } = useController({ control, name });
    return (
        <Controller
            name={name}
            control={control}
            render={({
                field: { onChange, value },
                fieldState: { error },
                formState,
            }) => (
                <Box className="flex flex-col gap-1">
                    <Autocomplete
                        size="small"
                        onChange={(e, data) => {
                            if (
                                !data ||
                                Array.isArray(data)
                            )
                                return;
                            // console.log(
                            //     "change data: ",
                            //     data,
                            // );
                            return onChange(
                                data.label as any,
                            );
                        }}
                        value={value.label}
                        fullWidth
                        className="rounded-md"
                        options={countries}
                        getOptionLabel={(option) =>
                            option?.label || ""
                        }
                        isOptionEqualToValue={(
                            option,
                            value,
                        ) =>
                            typeof value === "object" &&
                            "label" in value
                                ? option.label ===
                                  value.label
                                : option.label === value
                        }
                        renderOption={(props, option) => {
                            const boxProps = { ...props };
                            if ("key" in boxProps)
                                delete boxProps.key;
                            return (
                                <Box
                                    component="li"
                                    sx={{
                                        "& > img": {
                                            mr: 2,
                                            flexShrink: 0,
                                        },
                                    }}
                                    {...boxProps}
                                    key={`country-${option.label}-${option.code}`}
                                >
                                    <Image
                                        width={20}
                                        height={20}
                                        src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                        alt=""
                                    />
                                    {option.label} (
                                    {option.code})
                                </Box>
                            );
                        }}
                        renderInput={(params) => {
                            // console.info(
                            //     "country params: ",
                            //     params,
                            // );
                            return (
                                <TextField
                                    {...params}
                                    label="Choose a country"
                                    inputProps={{
                                        ...params.inputProps,
                                        autoComplete:
                                            "country-name", // disable autocomplete and autofill
                                    }}
                                    variant="outlined"
                                />
                            );
                        }}
                        renderTags={(
                            tagValue,
                            getTagProps,
                        ) => {
                            return tagValue.map(
                                (option, index) => (
                                    <Chip
                                        {...getTagProps({
                                            index,
                                        })}
                                        key={option.label}
                                        label={option.label}
                                    />
                                ),
                            );
                        }}
                    />
                    {error ? (
                        <Typography
                            variant="body2"
                            className=" text-red-500"
                            sx={{
                                marginInline: "14px",
                                fontSize: "12px",
                                fontWeight: 400,
                            }}
                        >
                            {error.message}
                        </Typography>
                    ) : null}
                </Box>
            )}
        />
    );
};
