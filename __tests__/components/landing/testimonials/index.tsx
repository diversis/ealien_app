import * as React from "react";
import "@testing-library/jest-dom";
import {
    fireEvent,
    render,
    screen,
} from "@testing-library/react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import {
//     Autoplay,
//     Keyboard,
//     Navigation,
//     A11y,
// } from "swiper/modules";

import TestimonialsSection from "@/components/landing/testimonials/";
import { setupIntersectionObserverMock } from "__mocks__/lib/intersectionObserverMock";

jest.mock("swiper/modules", () => ({
    Navigation: (props: any) => null,
    Keyboard: (props: any) => null,
    Autoplay: (props: any) => null,
    A11y: (props: any) => null,
}));

jest.mock("swiper/react", () => ({
    Swiper: ({ children }: { children: React.ReactNode }) =>
        children,
    SwiperSlide: ({
        children,
    }: {
        children: React.ReactNode;
    }) => children,
}));

jest.mock("swiper/css/bundle", () => jest.fn());

describe("TestimonialsSection", () => {
    beforeEach(() => {
        setupIntersectionObserverMock();
    });
    it("renders TestimonialsSection", () => {
        render(<TestimonialsSection />);

        expect(
            screen.getByTestId("testimonials-section"),
        ).toBeInTheDocument();

        expect(
            screen.getByTestId("testimonials-section-h2"),
        ).toBeInTheDocument();

        // screen.debug();
    });
});
