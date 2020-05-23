import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axiosMock from "axios";

import SearchBox from "./searchBox";

jest.mock("axios");

test("loading and display search result", () => {
  render(<SearchBox />);
  axiosMock.get.mockResolvedValueOnce({
    data: {
      title: "abc",
      description: "xyz",
      date_created: "2019-03-11T00:00:00Z"
    }
  });

  fireEvent.click(screen.getByRole("search"));
  console.log(screen, "screen");
});
