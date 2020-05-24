import React from "react";
import renderer from "react-test-renderer";
import SearchResItem from "./resItem";
import { AppContextProvider } from "../../AppContext";

const baseProps = {
  title: "abc",
  description: "xyz",
  date_created: "2019-03-11T00:00:00Z"
};

it("should render SearchResItem correctly", () => {
  const tree = renderer
    .create(
      <AppContextProvider>
        <SearchResItem item={baseProps} />
      </AppContextProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
