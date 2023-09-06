"use client";
import Image from "next/image";
import { useRef, useState, type TouchEvent } from "react";

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
    const [touchDown, setTouchDown] = useState(false);
    const [[x, y], setXY] = useState([0, 0]);
    const [[imgWidth, imgHeight], setSize] = useState([
        0, 0,
    ]);
    const ref = useRef<HTMLImageElement>(null);

    const getTouchPosition = (
        e: TouchEvent<HTMLDivElement>,
    ) => {
        const elem = e.touches[0].target as EventTarget &
            HTMLDivElement;
        const { top, left } = elem.getBoundingClientRect();
        // calculate cursor position on the image
        const x = e.touches[0].clientX - left;
        const y = e.touches[0].clientY - top;
        return { x, y };
    };

    const handleTouchStart = async () => {
        if (
            !document.body.classList.contains(
                "overflow-hidden",
            )
        )
            document.body.classList.add("overflow-hidden");

        await setTouchDown((state) => true);
        await setShowMagnifier((state) => true);
    };

    const handleTouchEnd = async () => {
        if (
            document.body.classList.contains(
                "overflow-hidden",
            )
        )
            document.body.classList.remove(
                "overflow-hidden",
            );
        await setTouchDown((state) => false);
        await setShowMagnifier((state) => false);
    };
    return (
        // the container
        <div
            className="group/magnifier grid aspect-square w-full cursor-none place-items-center"
            style={{
                position: "relative",
                height: width,
                width: width,
            }}
            onTouchStart={async (e) => {
                const elem = e.touches[0]
                    .target as EventTarget & HTMLDivElement;

                await handleTouchStart();
                const { width, height } =
                    elem.getBoundingClientRect();
                setSize([width, height]);

                const { x, y } = getTouchPosition(e);
                setXY([x, y]);
            }}
            onTouchEnd={async (e) => {
                await handleTouchEnd();
            }}
            onTouchCancel={async (e) => {
                await handleTouchEnd();
            }}
            onTouchMove={(e) => {
                // update cursor position

                const { x, y } = getTouchPosition(e);
                if (
                    (ref.current?.clientWidth &&
                        x > ref.current?.clientWidth) ||
                    x < 0
                )
                    handleTouchEnd();
                if (
                    (ref.current?.clientHeight &&
                        y > ref.current?.clientHeight) ||
                    y < 0
                )
                    handleTouchEnd();
                setXY([x, y]);
            }}
            onPointerEnter={(e) => {
                // update image size and turn-on magnifier
                if (touchDown) return;
                const elem = e.currentTarget;
                const { width, height } =
                    elem.getBoundingClientRect();
                setSize([width, height]);

                setShowMagnifier(true);
            }}
            onPointerLeave={(e) => {
                if (touchDown) return;

                setShowMagnifier(false);
            }}
            onPointerMove={(e) => {
                // update cursor position
                e.preventDefault();
                if (touchDown) return;
                const elem = e.currentTarget;
                const { top, left } =
                    elem.getBoundingClientRect();
                // calculate cursor position on the image
                const x = e.pageX - left - window.scrollX;
                const y = e.pageY - top - window.scrollY;
                setXY([x, y]);
            }}
            onContextMenu={(e) => e.preventDefault()}
        >
            <Image
                sizes="(max-width: 768px) 20rem,
            (max-width: 1280px) 30rem,
            15rem"
                ref={ref}
                src={src}
                alt={alt}
                priority
                className={`pointer-events-none aspect-square h-auto w-full rounded-xl border border-primary-900 object-cover transition-[filter] duration-500 [grid-area:1/1] group-hover/magnifier:blur-sm dark:border-primary-50 ${
                    touchDown ? "blur-sm" : ""
                }`}
                fill
                onContextMenu={(e) => e.preventDefault()}
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
