import * as React from "react";
import "@testing-library/jest-dom";
import {
    fireEvent,
    render,
    screen,
} from "@testing-library/react";

import Card from "@/components/landing/testimonials/Card";
import { setupIntersectionObserverMock } from "__mocks__/lib/intersectionObserverMock";
import { staticImageMock } from "__mocks__/staticImageMock";

describe("Card", () => {
    beforeEach(() => {
        setupIntersectionObserverMock();
    });
    it("renders Card", () => {
        render(
            <Card name="test" photo={staticImageMock()} />,
        );

        expect(
            screen.getByTestId("testimonials-card"),
        ).toBeInTheDocument();

        expect(
            screen.getByTestId(
                "testimonials-photo-wrapper",
            ),
        ).toBeInTheDocument();

        expect(
            screen.getByTestId("testimonials-article"),
        ).toBeInTheDocument();

        expect(
            screen.getByTestId(
                "testimonials-photo-article-name-wrapper",
            ),
        ).toBeInTheDocument();

        expect(
            screen.getByTestId(
                "testimonials-photo-article-quote-container",
            ),
        ).toBeInTheDocument();

        expect(
            screen.getByTestId(
                "testimonials-photo-article-quote",
            ),
        ).toBeInTheDocument();

        expect(
            screen.getByTestId(
                "testimonials-photo-article-quote-balancer",
            ),
        ).toBeInTheDocument();

        expect(
            screen.getByTestId(
                "testimonials-photo-article-quote-em",
            ),
        ).toBeInTheDocument();

        expect(
            screen.getByTestId(
                "testimonials-photo-article-quote-icon",
            ),
        ).toBeInTheDocument();

        // screen.debug();
    });
});
