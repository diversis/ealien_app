import * as React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Waves from "@/components/landing/waves/";
import { setupIntersectionObserverMock } from "__mocks__/lib/intersectionObserverMock";

describe("Waves", () => {
    beforeEach(() => {
        setupIntersectionObserverMock();
    });
    it("renders Waves", () => {
        render(<Waves />);

        expect(
            screen.getByTestId("waves"),
        ).toBeInTheDocument();

        // screen.debug();
    });
});
