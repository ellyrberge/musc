import React from "react";
import { render} from "@testing-library/react";
import { MemoryRouter} from "react-router-dom";

import ErrorPage from "./ErrorPage"
test("404 displayed", () => {
    const { getAllByTestId } = render(
        <MemoryRouter initialEntries={["/*"]}>
            <ErrorPage></ErrorPage>
        </MemoryRouter>
      );
  
    expect(getAllByTestId("404").length).toBe(1);
});
