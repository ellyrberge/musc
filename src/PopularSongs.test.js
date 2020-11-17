import React from "react";
import { render} from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import PopularSongs from "./PopularSongs"

test("PopularSongs displayed", () => {
    const { getAllByTestId } = render(
        <MemoryRouter initialEntries={["/*"]}>
            <PopularSongs></PopularSongs>
        </MemoryRouter>
      );
  
    expect(getAllByTestId("popSongs").length).toBe(1);
});

