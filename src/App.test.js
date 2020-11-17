import React from 'react'
import App from "./App.js"
import { render} from "@testing-library/react";



test("home button renders", () => {

    const { getAllByTestId } = render(
        <App/>
    );
  
    expect(getAllByTestId("home-button").length).toBe(1);
});

test("search button renders", () => {
    const { getAllByTestId } = render(
        <App/>
    );
  
    expect(getAllByTestId("search-button").length).toBe(1);
});

test("playlist title renders", () => {
    const { getAllByTestId } = render(
        <App/>
    );
  
    expect(getAllByTestId("playlist-title").length).toBe(1);
});

test("add playlist button renders", () => {
    const { getAllByTestId } = render(
        <App/>
    );
  
    expect(getAllByTestId("add-playlist-button").length).toBe(1);
});

test("logo reders", () => {
    const { getAllByTestId } = render(
        <App/>
    );
    expect(getAllByTestId("logo-image").length).toBe(1);
});

test("brand renders", () => {
    const { getAllByTestId } = render(
        <App/>
    );
    expect(getAllByTestId("brand-title").length).toBe(1);
});

