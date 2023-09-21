import ProductCard from "@/components/catalogue/productCard";
import Carousel from "@/components/shared/carousel/carousel";
import {
    CompactProduct,
    SerializedPrisma,
} from "@/lib/prisma/types";
import { Typography } from "@mui/material";

export default function BestProductsCarousel({
    products,
}: {
    products: SerializedPrisma<CompactProduct>[];
}) {
    return (
        <section
            className="max-h-screen w-full flex flex-col items-center !overflow-y-visible px-4"
            key="carousel-section"
        >
            <Typography
                variant="h2"
                tabIndex={0}
                className="h2 text-center"
            >
                Our products
            </Typography>
            <Carousel className="!overflow-y-visible px-4">
                {products.map((product) => (
                    <ProductCard
                        key={`card-${product.id}`}
                        product={product}
                    />
                ))}
            </Carousel>
        </section>
    );
}
