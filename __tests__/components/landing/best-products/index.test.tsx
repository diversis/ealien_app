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

import BestProducts from "@/components/landing/best-products/";
import { setupIntersectionObserverMock } from "__mocks__/lib/intersectionObserverMock";

jest.mock("swiper/modules", () => ({
    Navigation: (props: any) => null,
    Keyboard: (props: any) => null,
    Autoplay: (props: any) => null,
    A11y: (props: any) => null,
}));

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
    useSwiper: (props: any) => null,
}));

jest.mock("swiper/css/bundle", () => jest.fn());

describe("BestProducts", () => {
    beforeEach(() => {
        setupIntersectionObserverMock();
    });
    it("renders BestProducts", () => {
        render(<BestProducts products={[]} />);

        expect(
            screen.getByTestId("best-products-section"),
        ).toBeInTheDocument();

        expect(
            screen.getByTestId("best-products-section-h2"),
        ).toBeInTheDocument();

        // screen.debug();
    });
});
