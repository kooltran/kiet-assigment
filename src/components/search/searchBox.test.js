import React from "react";
import renderer from "react-test-renderer";
import SearchBox from "./searchBox";
import {
  render,
  fireEvent,
  waitFor,
  screen,
  act
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { AppContextProvider } from "../../AppContext";
import axiosMock from "axios";

jest.mock("axios");

const mockSetAction = jest.fn();

jest.mock("../../AppContext", () => ({
  AppContextProvider: jest.requireActual("../../AppContext").AppContextProvider,
  useAppContext() {
    return [undefined, mockSetAction];
  }
}));

test("should render SearchBox correctly", () => {
  const tree = renderer
    .create(
      <AppContextProvider>
        <SearchBox />
      </AppContextProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test("loading and display search result", async () => {
  const { getByTestId, getByRole } = render(
    <AppContextProvider>
      <SearchBox />
    </AppContextProvider>
  );
  const inputSearch = getByTestId("search-input");
  const buttonSearch = getByRole("search");

  axiosMock.get.mockResolvedValueOnce({
    data: {
      collection: {
        items: [
          {
            data: [
              {
                title: "abc",
                description: "xyz",
                date_created: "2019-03-11T00:00:00Z"
              }
            ]
          }
        ]
      }
    }
  });

  act(() => {
    fireEvent.change(inputSearch, { target: { value: "abc" } });
  });
  await waitFor(() => expect(buttonSearch).not.toHaveAttribute("disabled"));
  act(() => {
    fireEvent.click(buttonSearch, { button: 1 });
  });
  expect(inputSearch.value).toEqual("abc");
  await waitFor(() => expect(axiosMock.get).toHaveBeenCalled());
  expect(mockSetAction).toHaveBeenCalledWith(
    { isLoading: true },
    "SET_SEARCH_DATA"
  );
  expect(mockSetAction).toHaveBeenCalledWith(
    {
      searchResult: [
        {
          title: "abc",
          description: "xyz",
          date_created: "2019-03-11T00:00:00Z"
        }
      ],
      isLoading: false
    },
    "SET_SEARCH_DATA"
  );
});
