import React from "react";
import styled from "styled-components";
import SearchBox from "./components/search/searchBox";
import SearchResPanel from "./components/searchResPanel/searchResPanel";
import SortSelection from "./components/sort/sortSelection";

const StyledHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledAppContainer = styled.div`
  text-align: center;
`;

function App() {
  return (
    <StyledAppContainer>
      <StyledHeaderContainer>
        <SearchBox />
        <SortSelection />
      </StyledHeaderContainer>
      <SearchResPanel />
    </StyledAppContainer>
  );
}

export default App;
