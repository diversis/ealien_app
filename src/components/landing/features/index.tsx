import { AnimatePresence, m, useInView, useScroll } from "framer-motion";
import { useRef } from "react";

import Feature from "./feature";

import guitarPhoto from "@public/images/catalogue/guitar/r/18/1024.webp";
import violinPhoto from "@public/images/catalogue/violin/r/2/1024.webp";
import pianoPhoto from "@public/images/catalogue/piano/r/1/1024.webp";

const features = [
    {
        title: "In arcu cursus",
        photo: guitarPhoto,
        bg: "24",
        text: "Pharetra et ultrices neque ornare aenean euismod elementum. Nullam vehicula ipsum a arcu cursus vitae congue mauris rhoncus. Sed ullamcorper morbi tincidunt ornare massa eget egestas purus viverra. Mi sit amet mauris commodo quis imperdiet massa tincidunt. Eros donec ac odio tempor orci dapibus ultrices in iaculis.",
    },
    {
        title: "Nisl purus in mollis nunc",
        photo: violinPhoto,
        bg: "29",
        text: "Volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque in. Et molestie ac feugiat sed lectus vestibulum mattis ullamcorper velit. Morbi blandit cursus risus at ultrices mi tempus imperdiet. Bibendum arcu vitae elementum curabitur vitae nunc sed velit dignissim. Id aliquet risus feugiat in ante metus. Senectus et netus et malesuada fames ac turpis egestas maecenas.",
    },
    {
        title: "Ut morbi tincidunt",
        photo: pianoPhoto,
        bg: "25",
        text: "Pellentesque id nibh tortor id aliquet lectus proin nibh. Habitant morbi tristique senectus et netus et malesuada fames ac. Posuere morbi leo urna molestie at elementum eu. Enim ut tellus elementum sagittis vitae et leo.",
    },
];

export default function FeaturesSection() {
    const ref = useRef(null);
    const { scrollY, scrollYProgress } = useScroll({
        target: ref,
        offset: ["end end", "end start"],
    });
    const isInView = useInView(ref);
    // const scale = useTransform(scrollYProgress, [0.5, 0.8], [1, 0.5]);

    return (
        <m.section
            data-test="features-section"
            key="features-section"
            ref={ref}
            className="container  flex min-h-screen w-full  flex-col gap-y-16 "
        >
            <AnimatePresence>
                {features.map((feature, id) => (
                    <Feature
                        key={`feature-section-${id}`}
                        id={id}
                        photo={feature.photo}
                        title={feature.title}
                        text={feature.text}
                        bg={feature.bg}
                    />
                ))}
            </AnimatePresence>
        </m.section>
    );
}
