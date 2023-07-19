import Select, { SelectProps } from "@mui/material/Select";
import { Controller, useController } from "react-hook-form";
import type {
    SubmitHandler,
    DefaultValues,
    FieldValues,
    FieldPath,
    UseControllerProps,
} from "react-hook-form";
type InputProps<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName>;

export const ControlledSelect = <
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>,
>({
    name,
    control,
    label,
}: InputProps<TFieldValues, TName> & SelectProps) => {
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
                <Select
                    size="small"
                    error={!!error}
                    onChange={onChange as any}
                    value={value}
                    label={"" + label}
                    fullWidth
                    variant="outlined"
                    className="rounded-md"
                />
            )}
        />
    );
};
