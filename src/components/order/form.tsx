"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import axios, { AxiosError, AxiosResponse } from "axios";
import {
    Controller,
    FieldValues,
    SubmitErrorHandler,
    SubmitHandler,
    useForm,
} from "react-hook-form";
import z, { ZodError, ZodIssue } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSnackbar } from "notistack";
import Stepper from "@mui/material/Stepper";
import Button from "@mui/material/Button";

import { useCart } from "@/lib/hooks/use-cart";
import COUNTRIES_DATA from "@/lib/rest-countries/countries.json";
import useWindowSize from "@/lib/hooks/use-window-size";
// import SelectCountryItem from "./selectCountryItem";
import { CartItem } from "@/lib/prisma/types";
import { useShowSignInModal } from "@/lib/hooks/show-sign-in-modal";

import { OPACITY_VARIANTS } from "@/lib/constants";
import { ControlledTextField } from "../form/fields/controlledTextField";
import { ControlledCountrySelect } from "../form/fields/controlledCountrySelect";
import { ControlledRadioGroup } from "../form/fields/controlledRadioGroup";

const schema = z.object({
    name: z
        .string()
        .min(3, "Name must include at least 3 characters")
        .max(40, "Name too long"),
    email: z
        .string()
        .email("Invalid email")
        .nonempty("Email is required"),
    address: z.string().nonempty("Address is required"),
    city: z.string().nonempty("City is required"),
    postalCode: z
        .string()
        .nonempty("Postal Code is required"),
    country: z.string().nonempty("Country is required"),
    paymentMethod: z
        .string()
        .nonempty(
            "Please choose one of available payment methods",
        ),
});

type FormSchemaType = FieldValues & z.infer<typeof schema>;
type FormField =
    | "name"
    | "email"
    | "address"
    | "city"
    | "postalCode"
    | "country"
    | "paymentMethod";

async function saveFormData({
    data,
    url,
}: {
    data: FieldValues & { items: CartItem[] };
    url: string;
}): Promise<AxiosResponse<any, any>> {
    return await axios({
        method: "post",
        url: url,
        data: data,
    });
}

const endpoint = "/api/order/create";

const steps = [
    {
        label: "Personal information",
        fields: [
            {
                label: "name",
                component: ControlledTextField,
            },
            {
                label: "email",
                component: ControlledTextField,
            },
        ],
    },
    {
        label: "Shipping",
        fields: [
            {
                label: "address",
                component: ControlledTextField,
            },
            {
                label: "city",
                component: ControlledTextField,
            },
            {
                label: "postalCode",
                component: ControlledTextField,
            },
            {
                label: "country",
                component: ControlledCountrySelect,
            },
        ],
    },
    { label: "Payment",fields: [
        {
            label: "paymentMethod",
            component: ControlledRadioGroup,
        },

    ], },
    { label: "Complete" },
];

export default function OrderForm() {
    const {
        items,
        addItem,
        removeItem,
        clearCart,
        addQty,
        editable,
        show,
        toggle,
        setEditable,
    } = useCart((state) => ({
        items: state.items,
        addItem: state.addItem,
        removeItem: state.removeItem,
        clearCart: state.clearCart,
        addQty: state.addQty,
        editable: state.editable,
        setEditable: state.setEditable,
        show: state.show,
        toggle: state.toggleCart,
    }));
    const router = useRouter();
    const { data: session, status } = useSession();

    const { email, image, name } = session?.user || {};
    const { enqueueSnackbar, closeSnackbar } =
        useSnackbar();

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
            name: "",
            email: email || "",
            address: "",
            city: "",
            postalCode: "",
            country: "",
            paymentMethod: "paypal",
        },
    });

    const { isMobile, isDesktop } = useWindowSize();
    const [active, setActive] = useState(0);
    const [formVisible, setFormVisible] = useState(false);
    const [newOrderId, setNewOrderId] = useState("");
    const [showSignInModal] = useShowSignInModal(
        (state) => [state.showSignInModal],
    );

    const countriesData = COUNTRIES_DATA.map((country) => {
        return {
            value: country.name.official,
            label:
                Object.values(country.name.nativeName)[0]
                    ?.official || country.name.official,
            flag: {
                svg: country.flags.svg,
                alt: country.flags.alt,
            },
        };
    });
    const onError: SubmitErrorHandler<FormSchemaType> = (
        {
            name,
            email,
            address,
            city,
            postalCode,
            country,
            paymentMethod,
        },
        e,
    ) => {
        console.log("onError errors: ", errors);
        try {
            for (const [field, message] of Object.entries(
                errors,
            )) {
                // console.log(field, message);
                setActive(0);
            }
            const errorsMessage = Object.entries(
                errors,
            ).reduce(
                (m, [field, message]) => m + field + ", ",
                "",
            );

            enqueueSnackbar({
                message: `Fields with errors:${errorsMessage}`,
                variant: "error",
            });
        } catch (e) {
            console.error(errors, e);
        }
        setEditable(true);
    };
    const onSubmit: SubmitHandler<FormSchemaType> = async (
        data: FieldValues,
    ) => {
        // console.log("submit: ", { ...data });
        try {
            console.log({ ...data, items });
            const orderData: FieldValues & {
                items: CartItem[];
            } = {
                ...data,
                items: items.filter((i) => i.qty > 0),
            };
            const response = await saveFormData({
                data: orderData,
                url: endpoint,
            });
            console.log(response);
            setNewOrderId(response.data.orderId);
            clearCart();
            enqueueSnackbar({
                message: `Order create success. Order ID: ${response.data.orderId}`,
                variant: "success",
                autoHideDuration: 6000,
            });
            router.push(
                `/order/${response.data.orderId || "#"}`,
            );
        } catch (error) {
            if (
                error instanceof AxiosError &&
                error?.response?.data &&
                Array.isArray(error.response.data)
            ) {
                let BackToStep = 3;
                const data: ZodIssue[] =
                    error.response.data;
                // console.log(error);
                // Validation error
                const fieldToErrorMessage: {
                    field: string;
                    message: string;
                }[] = data.map((e) => {
                    return {
                        field: "" + e.path[0],
                        message: e.message,
                    };
                });
                console.error(fieldToErrorMessage);
                fieldToErrorMessage.map(
                    ({ field, message }) => {
                        if (field in getValues()) {
                            setError(field as FormField, {
                                type: "custom",
                                message: message,
                            });
                            if (
                                field in ["name", "email"]
                            ) {
                                BackToStep = -1;
                            } else if (
                                field in
                                [
                                    "address",
                                    "city",
                                    "postalCode",
                                    "country",
                                ]
                            ) {
                                BackToStep = Math.min(
                                    BackToStep,
                                    0,
                                );
                            } else {
                                BackToStep = Math.min(
                                    BackToStep,
                                    1,
                                );
                            }
                        }
                    },
                );
                console.log("redirectForm: ", BackToStep);
                setActive(BackToStep);
                const errorMessage =
                    fieldToErrorMessage.reduce(
                        (m, { field }) => m + field + ", ",
                        "",
                    );
                enqueueSnackbar({
                    message: `Errors occured while creating order:\n Fields with errors:\n ${errorMessage}`,
                    variant: "error",
                });
            } else {
                // unknown error
                console.error(error);

                enqueueSnackbar({
                    message: `An unexpected error occurred while processing, please try again`,
                    variant: "error",
                });
            }
            setEditable(true);
        }
    };

    const nextStep = async () => {
        let result = true;
        switch (active) {
            case 0: {
                if (email) {
                    setValue("name", name || "");
                    setValue("email", email || "");
                }
                result = await trigger(["name", "email"]);
                console.log("result:", result);
                break;
            }
            case 1: {
                result = await trigger([
                    "address",
                    "city",
                    "postalCode",
                    "country",
                ]);
                console.log("result:", result);
                break;
            }
            case 2: {
                result = await trigger(["paymentMethod"]);
                break;
            }
            default:
                break;
        }
        console.log(errors);
        setActive((current) => {
            return current < 3 && result
                ? current + 1
                : current;
        });
    };
    useEffect(() => {
        console.log(active);
    }, [active]);

    useEffect(() => {
        console.log(errors);
    }, [errors]);

    useEffect(() => {
        console.log(
            `\n-----\n name:  ${getValues(
                "name",
            )}\n-----\n email:  ${getValues(
                "email",
            )}\n-----\n address:  ${getValues(
                "address",
            )}\n-----\n city:  ${getValues(
                "city",
            )}\n-----\n country:  ${getValues(
                "country",
            )}\n-----\n postalCode:  ${getValues(
                "postalCode",
            )}\n-----\n paymentMethod:  ${getValues(
                "paymentMethod",
            )}\n-----\n`,
        );
    });

    useEffect(() => {
        if (isSubmitting || isSubmitSuccessful) {
            setEditable(false);
        }
        return () => setEditable(true);
    }, [isSubmitting, isSubmitSuccessful, setEditable]);

    const prevStep = () =>
        setActive((current) =>
            current > 0 ? current - 1 : current,
        );

    // const { isMobile, isTablet, isDesktop } = useWindowSize();
    const handleProceed = () => {
        setFormVisible(true);
    };
    return (
        <>
            <AnimatePresence mode="wait">
                {items.length > 0 && (
                    <>
                        {!formVisible ? (
                            <div className="aspect-square">
                                <Button
                                    onClick={handleProceed}
                                    className="group/checkout my-[100%] place-self-center text-base text-primary-900 dark:text-primary-50 lg:text-lg"
                                >
                                    Proceed
                                </Button>
                            </div>
                        ) : (
                            <motion.div
                                key="order-form-wrapper"
                                className="w-full [&>*]:!scale-100 "
                                layout="size"
                                transition={{
                                    layout: {
                                        type: "spring",
                                        stiffness: 150,
                                        mass: 0.3,
                                    },
                                }}
                            >
                                {!isSubmitSuccessful ? (
                                    <motion.form
                                        id="create-order-form"
                                        key={`order-form`}
                                        onSubmit={handleSubmit(
                                            onSubmit,
                                            onError,
                                        )}
                                        variants={
                                            OPACITY_VARIANTS
                                        }
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        className="rounded-xl bg-primary-50/50 p-2 transition-[height] duration-1000 dark:bg-primary-900/50"
                                    >
                                        <Stepper
                                            activeStep={
                                                active
                                            }
                                        >
                                            <Stepper.Step
                                                label="First step"
                                                description="Personal information"
                                                icon={
                                                    <FaUser className="h-3 w-3 fill-primary-900 transition-colors dark:fill-primary-50 lg:h-6 lg:w-6" />
                                                }
                                            >
                                                {!session ? (
                                                    <>
                                                        <Controller
                                                            name="name"
                                                            control={
                                                                control
                                                            }
                                                            render={({
                                                                field: {
                                                                    onChange,
                                                                    onBlur,
                                                                    value,
                                                                    name,
                                                                    ref,
                                                                },
                                                                fieldState:
                                                                    {
                                                                        invalid,
                                                                        isTouched,
                                                                        isDirty,
                                                                        error,
                                                                    },
                                                                formState,
                                                            }) => (
                                                                <TextInput
                                                                    error={
                                                                        errors
                                                                            ?.name
                                                                            ?.message
                                                                    }
                                                                    onBlur={
                                                                        onBlur
                                                                    } // notify when input is touched
                                                                    onChange={
                                                                        onChange
                                                                    } // send value to hook form
                                                                    ref={
                                                                        ref
                                                                    }
                                                                    withAsterisk
                                                                    key="name"
                                                                    label="Name"
                                                                    id="name"
                                                                    placeholder="Name"
                                                                    classNames={{
                                                                        error: "",
                                                                        wrapper:
                                                                            "!mb-0",
                                                                        root: "relative grid grid-rows-[auto_auto_1em]",
                                                                    }}
                                                                />
                                                            )}
                                                        />
                                                        <Controller
                                                            name="email"
                                                            control={
                                                                control
                                                            }
                                                            render={({
                                                                field: {
                                                                    onChange,
                                                                    onBlur,
                                                                    value,
                                                                    name,
                                                                    ref,
                                                                },
                                                                fieldState:
                                                                    {
                                                                        invalid,
                                                                        isTouched,
                                                                        isDirty,
                                                                        error,
                                                                    },
                                                                formState,
                                                            }) => (
                                                                <TextInput
                                                                    error={
                                                                        errors
                                                                            ?.email
                                                                            ?.message
                                                                    }
                                                                    autoComplete="email"
                                                                    onBlur={
                                                                        onBlur
                                                                    } // notify when input is touched
                                                                    onChange={
                                                                        onChange
                                                                    } // send value to hook form
                                                                    ref={
                                                                        ref
                                                                    }
                                                                    withAsterisk
                                                                    mt="md"
                                                                    key="email"
                                                                    id="email"
                                                                    label="Email"
                                                                    placeholder="Email"
                                                                    classNames={{
                                                                        error: "",
                                                                        wrapper:
                                                                            "!mb-0",
                                                                        root: "relative grid grid-rows-[auto_auto_1em]",
                                                                    }}
                                                                />
                                                            )}
                                                        />
                                                        <span className="mr-2">
                                                            Want
                                                            an
                                                            account?
                                                        </span>
                                                        <motion.button
                                                            onClick={(
                                                                e,
                                                            ) => {
                                                                e.preventDefault();
                                                                showSignInModal();
                                                            }}
                                                            disabled={
                                                                status ===
                                                                "loading"
                                                            }
                                                            className="link-border"
                                                        >
                                                            {status ===
                                                            "loading" ? (
                                                                <Loader />
                                                            ) : (
                                                                "Sign In"
                                                            )}
                                                        </motion.button>
                                                    </>
                                                ) : (
                                                    <div>
                                                        {!!email ? (
                                                            <div>
                                                                <p>
                                                                    Logged
                                                                    in
                                                                    as
                                                                </p>
                                                                <Image
                                                                    alt={
                                                                        email
                                                                    }
                                                                    src={
                                                                        image ||
                                                                        `https://avatars.dicebear.com/api/micah/${email}.svg`
                                                                    }
                                                                    width={
                                                                        40
                                                                    }
                                                                    height={
                                                                        40
                                                                    }
                                                                />
                                                                <p>
                                                                    {
                                                                        email
                                                                    }
                                                                </p>
                                                                <Controller
                                                                    name="name"
                                                                    control={
                                                                        control
                                                                    }
                                                                    render={({
                                                                        field: {
                                                                            onChange,
                                                                            onBlur,
                                                                            value,
                                                                            name,
                                                                            ref,
                                                                        },
                                                                        fieldState:
                                                                            {
                                                                                invalid,
                                                                                isTouched,
                                                                                isDirty,
                                                                                error,
                                                                            },
                                                                        formState,
                                                                    }) => {
                                                                        return (
                                                                            <TextInput
                                                                                error={
                                                                                    errors
                                                                                        ?.name
                                                                                        ?.message
                                                                                }
                                                                                onBlur={
                                                                                    onBlur
                                                                                } // notify when input is touched
                                                                                onChange={
                                                                                    onChange
                                                                                } // send value to hook form
                                                                                ref={
                                                                                    ref
                                                                                }
                                                                                hidden
                                                                                withAsterisk
                                                                                key="name"
                                                                                id="name"
                                                                                label="Name"
                                                                                placeholder="Name"
                                                                                classNames={{
                                                                                    error: "",
                                                                                    wrapper:
                                                                                        "!mb-0",
                                                                                    root: "hidden relative grid grid-rows-[auto_auto_1em]",
                                                                                }}
                                                                            />
                                                                        );
                                                                    }}
                                                                />
                                                                <Controller
                                                                    name="email"
                                                                    control={
                                                                        control
                                                                    }
                                                                    render={({
                                                                        field: {
                                                                            onChange,
                                                                            onBlur,
                                                                            value,
                                                                            name,
                                                                            ref,
                                                                        },
                                                                        fieldState:
                                                                            {
                                                                                invalid,
                                                                                isTouched,
                                                                                isDirty,
                                                                                error,
                                                                            },
                                                                        formState,
                                                                    }) => (
                                                                        <TextInput
                                                                            error={
                                                                                errors
                                                                                    ?.email
                                                                                    ?.message
                                                                            }
                                                                            autoComplete="email"
                                                                            onBlur={
                                                                                onBlur
                                                                            } // notify when input is touched
                                                                            onChange={
                                                                                onChange
                                                                            } // send value to hook form
                                                                            ref={
                                                                                ref
                                                                            }
                                                                            hidden
                                                                            withAsterisk
                                                                            mt="md"
                                                                            key="email"
                                                                            id="email"
                                                                            label="Email"
                                                                            placeholder="Email"
                                                                            classNames={{
                                                                                error: "",
                                                                                wrapper:
                                                                                    "!mb-0",
                                                                                root: "hidden relative grid grid-rows-[auto_auto_1em]",
                                                                            }}
                                                                        />
                                                                    )}
                                                                />
                                                            </div>
                                                        ) : (
                                                            <p>
                                                                Email
                                                                not
                                                                found
                                                            </p>
                                                        )}
                                                    </div>
                                                )}
                                            </Stepper.Step>

                                            <Stepper.Step
                                                label="Second step"
                                                description="Shipping address"
                                                classNames={{}}
                                                icon={
                                                    <FaCity className="h-3 w-3 fill-primary-900 transition-colors dark:fill-primary-50 lg:h-6 lg:w-6" />
                                                }
                                            >
                                                <Controller
                                                    name="address"
                                                    control={
                                                        control
                                                    }
                                                    render={({
                                                        field: {
                                                            onChange,
                                                            onBlur,
                                                            value,
                                                            name,
                                                            ref,
                                                        },
                                                        fieldState:
                                                            {
                                                                invalid,
                                                                isTouched,
                                                                isDirty,
                                                                error,
                                                            },
                                                        formState,
                                                    }) => {
                                                        console.log(
                                                            "address value: ",
                                                            value,
                                                        );
                                                        return (
                                                            <TextInput
                                                                error={
                                                                    errors
                                                                        ?.address
                                                                        ?.message
                                                                }
                                                                onBlur={
                                                                    onBlur
                                                                } // notify when input is touched
                                                                onChange={
                                                                    onChange
                                                                } // send value to hook form
                                                                ref={
                                                                    ref
                                                                }
                                                                key="address"
                                                                id="address"
                                                                autoComplete="street-address"
                                                                withAsterisk
                                                                label="Address"
                                                                placeholder="address"
                                                                classNames={{
                                                                    error: "",
                                                                    wrapper:
                                                                        "!mb-0",
                                                                    root: "relative grid grid-rows-[auto_auto_1em]",
                                                                }}
                                                            />
                                                        );
                                                    }}
                                                />
                                                {/* {errors.address && (
                                    <span className="block text-red-800">
                                        {errors.address?.message}
                                    </span>
                                )} */}
                                                <Controller
                                                    name="city"
                                                    control={
                                                        control
                                                    }
                                                    render={({
                                                        field: {
                                                            onChange,
                                                            onBlur,
                                                            value,
                                                            name,
                                                            ref,
                                                        },
                                                        fieldState:
                                                            {
                                                                invalid,
                                                                isTouched,
                                                                isDirty,
                                                                error,
                                                            },
                                                        formState,
                                                    }) => (
                                                        <TextInput
                                                            error={
                                                                errors
                                                                    ?.city
                                                                    ?.message
                                                            }
                                                            onBlur={
                                                                onBlur
                                                            } // notify when input is touched
                                                            onChange={
                                                                onChange
                                                            } // send value to hook form
                                                            ref={
                                                                ref
                                                            }
                                                            autoComplete="home city"
                                                            withAsterisk
                                                            mt="md"
                                                            key="city"
                                                            id="city"
                                                            label="City"
                                                            placeholder="city"
                                                            classNames={{
                                                                error: "",
                                                                wrapper:
                                                                    "!mb-0",
                                                                root: "relative grid grid-rows-[auto_auto_1em]",
                                                            }}
                                                        />
                                                    )}
                                                />
                                                <Controller
                                                    name="postalCode"
                                                    control={
                                                        control
                                                    }
                                                    rules={{
                                                        required:
                                                            true,
                                                    }}
                                                    render={({
                                                        field: {
                                                            onChange,
                                                            onBlur,
                                                            value,
                                                            name,
                                                            ref,
                                                        },
                                                        fieldState:
                                                            {
                                                                invalid,
                                                                isTouched,
                                                                isDirty,
                                                                error,
                                                            },
                                                        formState,
                                                    }) => (
                                                        <TextInput
                                                            error={
                                                                errors
                                                                    ?.postalCode
                                                                    ?.message
                                                            }
                                                            onBlur={
                                                                onBlur
                                                            } // notify when input is touched
                                                            onChange={
                                                                onChange
                                                            } // send value to hook form
                                                            ref={
                                                                ref
                                                            }
                                                            autoComplete="postal-code"
                                                            withAsterisk
                                                            mt="md"
                                                            id="postalCode"
                                                            label="Postal code"
                                                            placeholder="postalCode"
                                                            classNames={{
                                                                error: "",
                                                                wrapper:
                                                                    "!mb-0",
                                                                root: "relative grid grid-rows-[auto_auto_1em]",
                                                            }}
                                                        />
                                                    )}
                                                />
                                                <Controller
                                                    name="country"
                                                    control={
                                                        control
                                                    }
                                                    render={({
                                                        field: {
                                                            onChange,
                                                            onBlur,
                                                            value,
                                                            name,
                                                            ref,
                                                        },
                                                        fieldState:
                                                            {
                                                                invalid,
                                                                isTouched,
                                                                isDirty,
                                                                error,
                                                            },
                                                        formState,
                                                    }) => (
                                                        <Select
                                                            error={
                                                                errors
                                                                    ?.country
                                                                    ?.message
                                                            }
                                                            onBlur={
                                                                onBlur
                                                            } // notify when input is touched
                                                            onChange={
                                                                onChange
                                                            } // send value to hook form
                                                            ref={
                                                                ref
                                                            }
                                                            autoComplete="country-name"
                                                            name="country"
                                                            withAsterisk
                                                            data={
                                                                countriesData
                                                            }
                                                            searchable
                                                            itemComponent={
                                                                SelectCountryItem
                                                            }
                                                            nothingFound="Nothing found"
                                                            maxDropdownHeight={
                                                                320
                                                            }
                                                            mt="md"
                                                            id="country"
                                                            label="Country"
                                                            placeholder="country"
                                                            onSearchChange={(
                                                                value,
                                                            ) => {}}
                                                            filter={(
                                                                value,
                                                                item,
                                                            ) =>
                                                                item.label
                                                                    ?.toLowerCase()
                                                                    .includes(
                                                                        value
                                                                            .toLowerCase()
                                                                            .trim(),
                                                                    ) ||
                                                                item.value
                                                                    .toLowerCase()
                                                                    .includes(
                                                                        value
                                                                            .toLowerCase()
                                                                            .trim(),
                                                                    )
                                                            }
                                                            classNames={{
                                                                error: "",
                                                                wrapper:
                                                                    "!mb-0",
                                                                root: "relative grid grid-rows-[auto_auto_1em]",
                                                            }}
                                                        />
                                                    )}
                                                />
                                            </Stepper.Step>
                                            <Stepper.Step
                                                label="Third step"
                                                description="Payment Method"
                                                icon={
                                                    <FaCreditCard className="h-3 w-3 fill-primary-900 transition-colors dark:fill-primary-50 lg:h-6 lg:w-6" />
                                                }
                                            >
                                                <Controller
                                                    name="paymentMethod"
                                                    control={
                                                        control
                                                    }
                                                    render={({
                                                        field: {
                                                            onChange,
                                                            onBlur,
                                                            value,
                                                            name,
                                                            ref,
                                                        },
                                                        fieldState:
                                                            {
                                                                invalid,
                                                                isTouched,
                                                                isDirty,
                                                                error,
                                                            },
                                                        formState,
                                                    }) => (
                                                        <Radio.Group
                                                            error={
                                                                errors
                                                                    ?.paymentMethod
                                                                    ?.message
                                                            }
                                                            onBlur={
                                                                onBlur
                                                            } // notify when input is touched
                                                            onChange={
                                                                onChange
                                                            } // send value to hook form
                                                            ref={
                                                                ref
                                                            }
                                                            name="paymentMethod"
                                                            id="paymentMethod"
                                                            label="select preferred payment method"
                                                            withAsterisk
                                                        >
                                                            <Group>
                                                                <Radio
                                                                    id="paypal"
                                                                    value="paypal"
                                                                    label="Paypal"
                                                                />
                                                                <Radio
                                                                    id="cc"
                                                                    value="cc"
                                                                    label="Credit Card"
                                                                    disabled
                                                                />
                                                            </Group>
                                                        </Radio.Group>
                                                    )}
                                                />
                                            </Stepper.Step>
                                            <Stepper.Completed>
                                                Completed!
                                                Form values:
                                                <Code
                                                    block
                                                    mt="xl"
                                                >
                                                    {/* {JSON.stringify(form.values, null, 2)} */}
                                                    {JSON.stringify(
                                                        getValues(),
                                                        null,
                                                        2,
                                                    )}
                                                </Code>
                                            </Stepper.Completed>
                                        </Stepper>
                                        <Group
                                            position="right"
                                            mt="xl"
                                        >
                                            {active !==
                                                0 && (
                                                <Button
                                                    variant="default"
                                                    onClick={
                                                        prevStep
                                                    }
                                                >
                                                    Back
                                                </Button>
                                            )}

                                            {active ===
                                                3 && (
                                                <Button
                                                    form="create-order-form"
                                                    type="submit"
                                                    classNames={{
                                                        root: "text-primary-900 dark:text-primary-50",
                                                    }}
                                                    disabled={
                                                        isSubmitting
                                                    }
                                                >
                                                    {isSubmitting ? (
                                                        <Loader />
                                                    ) : (
                                                        "Submit"
                                                    )}
                                                </Button>
                                            )}
                                            {active < 3 && (
                                                <Button
                                                    form="create-order-form"
                                                    type="button"
                                                    classNames={{
                                                        root: "text-primary-900 dark:text-primary-50",
                                                    }}
                                                    onClick={
                                                        nextStep
                                                    }
                                                >
                                                    Next
                                                    step
                                                </Button>
                                            )}

                                            {/* {(<Button
                                    form="create-order-form"
                                    type={`${
                                        active === 3 ? "submit" : "button"
                                    }`}
                                    classNames={{
                                        root: "text-primary-900 dark:text-primary-50",
                                    }}
                                    onClick={nextStep}
                                >Next step</Button>)  }   */}
                                        </Group>
                                    </motion.form>
                                ) : (
                                    <motion.div className="flex justify-center rounded-xl bg-primary-50/50 p-2 transition-colors duration-1000 dark:bg-primary-900/50">
                                        <Link
                                            href={`/order/${
                                                newOrderId ||
                                                "#"
                                            }`}
                                        >
                                            View Order
                                        </Link>
                                    </motion.div>
                                )}
                            </motion.div>
                        )}
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
