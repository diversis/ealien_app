import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogContentText,
    Button,
    DialogActions,
    TextField,
    Typography,
    Box,
} from "@mui/material";
import {
    Controller,
    SubmitHandler,
    useForm,
    FieldValues,
} from "react-hook-form";
import axios, { AxiosError, AxiosResponse } from "axios";
import z, { ZodError, ZodIssue } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from "@mui/base/Modal";
import {
    ComponentPropsWithoutRef,
    ReactNode,
    forwardRef,
    useState,
} from "react";
import MUIBaseModal from "../shared/muibase-modal";

interface ReviewModalProps
    extends ComponentPropsWithoutRef<"div"> {
    triggerText?: string;
    productName: string;
    classNames?: {
        root?: string;
        trigger?: string;
    };
}

const schema = z
    .string()
    .min(3, "Review must include at least 3 characters")
    .max(1200, "Review too long (1200 characters max)");

type Inputs = {
    review: string;
};

async function sendFormData({
    data,
    url,
}: {
    data: Inputs;
    url: string;
}): Promise<AxiosResponse<any, any>> {
    return await axios({
        method: "post",
        url: url,
        data: data,
    });
}

export default function ReviewModal({
    productName,
    ...rest
}: ReviewModalProps) {
    const endpoint = "/api/review";

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

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
        formState: {
            isSubmitting,
            errors,
            isSubmitSuccessful,
            isDirty,
            isValid,
        },
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            review: "",
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = async (
        { review },
        e,
    ) => {
        try {
            const response = await sendFormData({
                data: review,
                url: endpoint,
            });
            if (response.status) {
                console.log(
                    "response.status ",
                    response.status,
                );
            }
        } catch (error) {
            console.log(error);
            const res = {
                error: error,
            };
        }
    };
    return (
        <MUIBaseModal
            modalOpen={open}
            aria-labelledby="review-modal-title"
            aria-describedby="review-modal-description"
            triggerText="Post a Review"
            {...rest}
        >
            <form
                className="relative  "
                onSubmit={handleSubmit(onSubmit)}
            >
                <Typography
                    id="review-modal-title"
                    variant="h2"
                    className="text-surface-900 dark:text-surface-50"
                >
                    Review
                </Typography>
                <Box>
                    <Typography
                        id="review-modal-description"
                        variant="body1"
                        className="text-surface-900 dark:text-surface-50"
                    >
                        Compose a review for &quot;
                        {productName}
                        &quot;
                    </Typography>
                    <Controller
                        name="review"
                        control={control}
                        render={({
                            field: {
                                onChange,
                                onBlur,
                                value,
                                name,
                                ref,
                            },
                            fieldState: {
                                invalid,
                                isTouched,
                                isDirty,
                                error,
                            },
                            formState,
                        }) => (
                            <TextField
                                autoFocus
                                margin="normal"
                                id="name"
                                label="Review"
                                type="text"
                                fullWidth
                                variant="outlined"
                                className="rounded-md bg-surface-100/50 "
                            />
                        )}
                    />
                </Box>
                <div className="flex flex-row justify-end">
                    <Button onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button type="submit">Post</Button>
                </div>
            </form>
        </MUIBaseModal>
    );
}
