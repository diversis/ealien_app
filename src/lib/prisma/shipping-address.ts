import prisma from "@/lib/prisma/prisma";
import { ShippingAddress } from "@prisma/client";
const logger = require("@/lib/utils/logger");

export async function getShippingAddress({
    id,
}: {
    id: ShippingAddress["id"];
}) {
    try {
        return prisma.shippingAddress.findUniqueOrThrow({ where: { id } });
    } catch (NotFoundError) {
        logger.info();
        return null;
    }
}
