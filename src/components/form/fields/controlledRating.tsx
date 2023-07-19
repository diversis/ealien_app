import { Controller, useController } from "react-hook-form";
import TextField from "@mui/material/TextField";
import type {
    SubmitHandler,
    DefaultValues,
    FieldValues,
    FieldPath,
    UseControllerProps,
} from "react-hook-form";
import { Rating, RatingProps } from "@mui/material";
type InputProps<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName>;

export const ControlledRating = <
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>,
>({
    name,
    control,
    label,
}: InputProps<TFieldValues, TName> & {
    label?: string;
} & RatingProps) => {
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
                <Rating
                    onChange={onChange as any}
                    value={Number(value)}
                    className=""
                    precision={0.5}
                />
                // {!!error ? (<Typography>{error.message}</Typography>) : null}
            )}
        />
    );
};
