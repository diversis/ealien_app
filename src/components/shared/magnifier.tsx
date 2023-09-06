"use client";
import Image from "next/image";
import { useRef, useState } from "react";

export default function ImageMagnifier({
    src,
    alt,
    width,
    height,
    magnifierHeight = 100,
    magnifierWidth = 100,
    zoomLevel = 1.5,
}: {
    src: string;
    alt: string;
    width?: string;
    height?: string;
    magnifierHeight?: number;
    magnifierWidth?: number;
    zoomLevel?: number;
}) {
    const [showMagnifier, setShowMagnifier] =
        useState(false);
    const [[x, y], setXY] = useState([0, 0]);
    const [[imgWidth, imgHeight], setSize] = useState([
        0, 0,
    ]);
    const ref = useRef<HTMLImageElement>(null);
    // console.log(ref.current?.clientWidth);
    return (
        // the container
        <div
            className="grid aspect-square w-full cursor-none place-items-center"
            style={{
                position: "relative",
                height: width,
                width: width,
            }}
            onPointerEnter={(e) => {
                // update image size and turn-on magnifier
                const elem = e.currentTarget;
                const { width, height } =
                    elem.getBoundingClientRect();
                setSize([width, height]);
                document.body.classList.toggle(
                    "overflow-hidden",
                );
                setShowMagnifier(true);
            }}
            onPointerLeave={(e) => {
                e.currentTarget.classList.toggle(
                    "filter-noise",
                );
                document.body.classList.toggle(
                    "overflow-hidden",
                );
                setShowMagnifier(false);
            }}
            onPointerMove={(e) => {
                // update cursor position
                const elem = e.currentTarget;
                const { top, left } =
                    elem.getBoundingClientRect();

                // calculate cursor position on the image
                const x = e.pageX - left - window.scrollX;
                const y = e.pageY - top - window.scrollY;
                setXY([x, y]);
            }}
        >
            <Image
                sizes="(max-width: 768px) 20rem,
            (max-width: 1280px) 30rem,
            15rem"
                ref={ref}
                src={src}
                alt={alt}
                priority
                className="aspec-square pointer-events-none h-auto w-full rounded-xl border border-primary-900 object-cover transition-[filter] duration-500 [grid-area:1/1] hover:blur-sm dark:border-primary-50"
                fill
            />
            <div
                style={{
                    display: showMagnifier ? "" : "none",

                    // set size of magnifier
                    height: `${magnifierHeight}px`,
                    width: `${magnifierWidth}px`,
                    // move element center to cursor pos
                    top: `${y - magnifierHeight / 2}px`,
                    left: `${x - magnifierWidth / 2}px`,
                    opacity: "1", // reduce opacity so you can verify position

                    backgroundImage: `url('${
                        src.substring(0, src.length - 9) +
                        "1024.webp"
                    }')`,
                    backgroundRepeat: "no-repeat",
                    //calculate zoomed image size
                    backgroundSize: `${
                        imgWidth * zoomLevel
                    }px ${imgHeight * zoomLevel}px`,
                    //calculate position of zoomed image.
                    backgroundPositionX: `${
                        -x * zoomLevel + magnifierWidth / 2
                    }px`,
                    backgroundPositionY: `${
                        -y * zoomLevel + magnifierHeight / 2
                    }px`,
                }}
                className="pointer-events-none absolute rounded-[50%] bg-no-repeat backdrop-blur-lg"
            ></div>
        </div>
    );
}
