"use client";
import { useSwiper } from "swiper/react";
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

export default function SwiperNav() {
    const swiper = useSwiper();
    return (
        <>
            <Button
                size="small"
                type="button"
                title="Предыдущий слайд"
                onClick={() => swiper.slidePrev()}
                className="button-overlay absolute left-6 top-[calc(50%_-_1.25rem)] z-20 grid  place-items-center rounded-full bg-surface-50/70 p-1 backdrop-blur-sm dark:bg-surface-900/70"
            >
                <KeyboardArrowLeft />
            </Button>
            <Button
                size="small"
                type="button"
                title="Следующий слайд"
                onClick={() => swiper.slideNext()}
                className="button-overlay absolute right-6 top-[calc(50%_-_1.25rem)] z-20 grid  place-items-center rounded-full bg-surface-50/70 p-1 backdrop-blur-sm dark:bg-surface-900/70"
            >
                <KeyboardArrowRight />
            </Button>
        </>
    );
}
