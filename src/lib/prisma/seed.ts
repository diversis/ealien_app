import { PrismaClient } from "@prisma/client";

import {
    getAlienGuitars,
    getAlienPianos,
    getAlienViolins,
} from "./prodlist";

const prisma = new PrismaClient();

async function seed() {

    try {
        const guitarsProvider =
            await prisma.category.create({
                data: { name: "Guitars" },
            });
        const violinsProvider =
            await prisma.category.create({
                data: { name: "Violins" },
            });
        const pianosProvider = await prisma.category.create(
            {
                data: { name: "Pianos" },
            },
        );
    } catch {
        const guitarsProvider =
            await prisma.category.findFirst({
                where: {
                    name: "Guitars",
                },
            });
        const violinsProvider =
            await prisma.category.findFirst({
                where: { name: "Violins" },
            });
        const pianosProvider =
            await prisma.category.findFirst({
                where: { name: "Pianos" },
            });
    }
    // cleanup the existing database
    // await prisma.user
    //     .delete({ where: { email } })
    //     .catch(() => {
    //         // no worries if it doesn't exist yet
    //     });
    const productCount = await prisma.product.count({})
    if (productCount === 0) {
        await Promise.all(
            getAlienGuitars().map((prod) => {
                const data = {
                    ...prod,
                    categories: {
                        connect: [{ name: "Guitars" }],
                    },
                };
                return prisma.product.create({ data });
            }),
        );
        await Promise.all(
            getAlienViolins().map((prod) => {
                const data = {
                    ...prod,
                    categories: {
                        connect: [{ name: "Violins" }],
                    },
                };
                return prisma.product.create({ data });
            }),
        );
        await Promise.all(
            getAlienPianos().map((prod) => {
                const data = {
                    ...prod,
                    categories: {
                        connect: [{ name: "Pianos" }],
                    },
                };
                return prisma.product.create({ data });
            }),
        );
    }

    console.log(`Database has been seeded. 🌱`);
}

seed()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
