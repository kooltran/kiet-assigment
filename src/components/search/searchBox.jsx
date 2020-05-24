import React, { useState, useCallback } from "react";
import { Input, Button } from "antd";
import styled from "styled-components";
import { SearchOutlined } from "@ant-design/icons";
import { searchApi } from "../../api/searchApi";
import { useAppContext } from "../../AppContext";

const StyledSearchContainer = styled.div`
  display: flex;
`;

const SearchBox = () => {
  const [searchKey, setSearchKey] = useState("");
  const [, setAction] = useAppContext();

  const setData = useCallback(data => setAction(data, "SET_SEARCH_DATA"), [
    setAction
  ]);

  const handleSearch = e => {
    setSearchKey(e.target.value);
  };

  const handleKeyDownSubmit = e => {
    if (e.key === "Enter") {
      submitSearch();
    }
  };

  const submitSearch = useCallback(async () => {
    setData({
      isLoading: true
    });
    const res = await searchApi(searchKey);
    setData({
      searchResult: res.collection.items.map(item => item.data[0]),
      isLoading: false
    });
    localStorage.setItem(
      "searchResult",
      res.collection.items.map(item => item.data[0])
    );
  }, [searchKey, setData]);

  return (
    <StyledSearchContainer>
      <Input
        type="text"
        onChange={handleSearch}
        onKeyDown={handleKeyDownSubmit}
        data-testid="search-input"
      />
      <Button
        size="large"
        type="primary"
        icon={<SearchOutlined />}
        onClick={submitSearch}
        disabled={!searchKey}
        role="search"
      />
    </StyledSearchContainer>
  );
};

export default SearchBox;
