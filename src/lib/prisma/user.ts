import prisma from "@/lib/prisma/prisma";
import { User, Session } from "@prisma/client";

export async function getUserByID(id: User["id"]) {
    return prisma.user.findUnique({ where: { id } });
}

export async function getUserByIDWithShippingAddress(id: User["id"]) {
    return prisma.user.findUnique({
        where: { id },
        include: { shippingAddress: true },
    });
}
