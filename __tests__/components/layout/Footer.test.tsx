import * as React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Footer from "@/components/layout/Footer";
import { setupIntersectionObserverMock } from "__mocks__/lib/intersectionObserverMock";

describe("Footer", () => {
    beforeEach(() => {
        setupIntersectionObserverMock();
    });
    it("renders Footer", () => {
        render(<Footer />);

        expect(
            screen.getByTestId("footer"),
        ).toBeInTheDocument();

        // screen.debug();
    });
});
