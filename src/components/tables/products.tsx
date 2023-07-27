import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

import { useCart } from "@/lib/hooks/use-cart";

import {
    CartItem,
    CompactOrderItem,
    CompactProduct,
    SerializableNext,
} from "@/lib/prisma/types";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { OrderItem } from "@prisma/client";

export default function ProductTable({
    total,
    editable = false,
    removeItem,
    addQty,
    items,
}: {
    total?: number;
    editable?: boolean;
    items:
        | CartItem[]
        | (SerializableNext<CompactOrderItem> & {
              product: SerializableNext<CompactProduct>;
          })[];
    removeItem?: (id: string) => void;
    addQty?: (
        id: string,
        qty: number,
        setQty?: boolean | undefined,
    ) => void;
}) {
    return (
        <TableContainer>
            {items ? (
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell className="  w-1/5 whitespace-nowrap"></TableCell>
                            <TableCell
                                align="center"
                                scope="col"
                                className=" w-full "
                            >
                                Product Name
                            </TableCell>
                            <TableCell
                                align="center"
                                scope="col"
                                className="  "
                            >
                                Price
                            </TableCell>
                            <TableCell
                                align="center"
                                scope="col"
                                className="  "
                            >
                                Qty
                            </TableCell>
                            <TableCell
                                align="center"
                                scope="col"
                                className="   px-8"
                            >
                                Sum
                            </TableCell>
                            <TableCell
                                scope="col"
                                className="!w-0 !p-0 "
                            ></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((item) => {
                            const { name, image, id } =
                                "product" in item
                                    ? item.product
                                    : item;
                            return (
                                <TableRow
                                    key={`table-item-${item.id}`}
                                    className={`${
                                        item.qty > 0
                                            ? ""
                                            : "bg-surface-500"
                                    }`}
                                    hover
                                >
                                    <TableCell
                                        scope="row"
                                        className="relative w-1/5 min-w-[4rem] !p-0 lg:min-w-[8rem]"
                                    >
                                        <Link
                                            href={`/catalogue/${id}`}
                                        >
                                            <picture className="grid w-full place-items-center">
                                                <Image
                                                    alt={
                                                        name
                                                    }
                                                    src={`/images/catalogue/${image}/256.webp`}
                                                    width={
                                                        120
                                                    }
                                                    height={
                                                        120
                                                    }
                                                    className="object-contain transition-[filter] duration-500 group-hover/card:blur-sm group-hover/card:grayscale"
                                                ></Image>
                                            </picture>
                                        </Link>
                                    </TableCell>
                                    <TableCell
                                        scope="row"
                                        className="  w-full   "
                                    >
                                        <Link
                                            href={`/catalogue/${id}`}
                                        >
                                            {name}
                                        </Link>
                                    </TableCell>
                                    <TableCell
                                        scope="row"
                                        className=" text-center "
                                    >
                                        {item.price?.toFixed(
                                            2,
                                        )}
                                    </TableCell>
                                    <TableCell
                                        scope="row"
                                        className="text-center "
                                    >
                                        <p className="inline-flex flex-col items-center">
                                            {!!addQty && (
                                                <Button
                                                    onClick={() =>
                                                        addQty(
                                                            item.id,
                                                            1,
                                                        )
                                                    }
                                                    disabled={
                                                        !editable
                                                    }
                                                >
                                                    +
                                                </Button>
                                            )}
                                            {item.qty}
                                            {!!addQty && (
                                                <Button
                                                    onClick={() =>
                                                        addQty(
                                                            item.id,
                                                            -1,
                                                        )
                                                    }
                                                    disabled={
                                                        !editable
                                                    }
                                                >
                                                    -
                                                </Button>
                                            )}
                                        </p>
                                    </TableCell>
                                    <TableCell
                                        scope="row"
                                        className="   text-center "
                                    >
                                        {(
                                            item.qty *
                                            (item.price ??
                                                0)
                                        ).toFixed(2)}
                                    </TableCell>

                                    <TableCell
                                        scope="row"
                                        className="w-0  !p-0 lg:w-0"
                                    >
                                        {!!removeItem && (
                                            <Button
                                                onClick={() =>
                                                    removeItem(
                                                        item.id,
                                                    )
                                                }
                                                disabled={
                                                    !editable
                                                }
                                            >
                                                <DeleteIcon />
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            );
                        })}

                        {!!total && (
                            <TableRow>
                                <TableCell
                                    colSpan={2}
                                    scope="row"
                                    className=" text-right"
                                >
                                    <span>TOTAL:</span>
                                </TableCell>

                                <TableCell
                                    colSpan={4}
                                    scope="row"
                                    className="text-center"
                                >
                                    <span>
                                        {total.toFixed(2)}
                                    </span>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            ) : null}
            {items ? null : <div> Cart is Empty</div>}
        </TableContainer>
    );
}
