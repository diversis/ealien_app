import {
    Controller,
    FieldValues,
    FormProvider,
    SubmitErrorHandler,
    SubmitHandler,
    useForm,
} from "react-hook-form";
import {
    Box,
    Breadcrumbs,
    Button,
    Skeleton,
    Typography,
    Paper,
    Select,
} from "@mui/material";
import { useSnackbar } from "notistack";

import { useCart } from "@/lib/hooks/use-cart";
import { SerializedPrisma } from "@/lib/prisma/types";
import { Category, Product } from "@prisma/client";
import { ControlledSelect } from "./fields/controlledSelect";
import { ControlledTextField } from "./fields/controlledTextField";

interface FormValues {
    qty: number;
}

export default function AddToCart({
    product,
}: {
    product: SerializedPrisma<Product> & {
        categories: { name: Category["name"] }[];
    };
}) {
    const { addItem } = useCart();
    const { enqueueSnackbar, closeSnackbar } =
        useSnackbar();

    const methods = useForm({
        defaultValues: {
            qty: 1,
        },
    });
    const {
        control,
        register,
        handleSubmit,
        setError,
        reset,
        setFocus,
        getValues,
        trigger,
        setValue,
        clearErrors,
        formState: {
            isSubmitting,
            errors,
            isSubmitSuccessful,
            isDirty,
            isValid,
        },
    } = methods;

    const onSubmit: SubmitHandler<FormValues> = async (
        data: FormValues,
    ) => {
        try {
            addItem({
                product,
                qty: Number(data.qty),
                setQty: false,
            });
            enqueueSnackbar({
                message: `Added  to cart: ${
                    product.name
                } x ${data.qty} for $${
                    product.price || 0 * data.qty
                }`,
                variant: "success",
                autoHideDuration: 6000,
            });
            reset();
        } catch (error) {
            console.log(error);
            enqueueSnackbar({
                message: `Failed to add: ${product.name},\n reason: ${error}`,
                variant: "success",
                autoHideDuration: 6000,
            });
        }
    };
    const onError: SubmitErrorHandler<FormValues> = (
        errors,
        e,
    ) => {
        enqueueSnackbar({
            message: `Failed to add: ${product.name},\n reason: ${errors.qty}`,
            variant: "success",
            autoHideDuration: 6000,
        });
    };
    const isStockEmpty = product.countInStock
        ? product.countInStock <= 0
        : true;
    return (
        <Paper className="p-2">
            <form
                id="form-add-to-cart"
                className="flex flex-col items-center gap-4"
                onSubmit={handleSubmit(onSubmit, onError)}
            >
                {isStockEmpty ? (
                    <Typography variant="body2">
                        Not in stock
                    </Typography>
                ) : null}
                <Typography variant="body2">
                    ${product.price}
                </Typography>
                <ControlledTextField
                    name="qty"
                    control={control}
                    label="Quantity"
                    type="number"
                    InputProps={{
                        inputProps: {
                            min: 0,
                            max: product.countInStock,
                        },
                    }}
                />
                <Button
                    variant="contained"
                    className=" "
                    title={
                        isStockEmpty
                            ? "Product not in stock"
                            : ""
                    }
                    color="secondary"
                    disabled={isStockEmpty}
                    type="submit"
                >
                    Add to Cart
                </Button>
            </form>
        </Paper>
    );
}
