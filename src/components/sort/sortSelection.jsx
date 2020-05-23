import React from "react";
import Select from "react-select";
import { useAppContext } from "../../AppContext";

const optionSort = [
  { label: "a-z", value: "ascAlpha" },
  { label: "z-a", value: "decsAlpha" },
  { label: "oldest -> newest", value: "decsTime" },
  { label: "newest -> oldest", value: "ascTime" }
];

const customStyles = {
  container: provided => ({
    ...provided,
    width: 200
  })
};

const SortSelection = () => {
  const [data, setAction] = useAppContext();
  const { searchResult } = data;

  const handleChangeSort = option => {
    let sortedData = [];
    switch (option.value) {
      case "decsTime":
        sortedData = searchResult.sort(
          (a, b) => new Date(a.date_created) - new Date(b.date_created)
        );
        break;
      case "ascTime":
        sortedData = searchResult.sort(
          (a, b) => new Date(b.date_created) - new Date(a.date_created)
        );
        break;
      case "ascAlpha":
        sortedData = searchResult.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        break;
      case "decsAlpha":
        sortedData = searchResult.sort((a, b) =>
          b.title.localeCompare(a.title)
        );
        break;
      default:
        sortedData = searchResult;
    }
    setAction(sortedData);
  };

  return (
    <Select
      className="sort"
      styles={customStyles}
      options={optionSort}
      onChange={handleChangeSort}
    />
  );
};

export default SortSelection;
