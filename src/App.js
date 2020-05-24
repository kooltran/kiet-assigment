import React from "react";
import styled from "styled-components";
import SearchBox from "./components/search/searchBox";
import SearchResPanel from "./components/searchResPanel/searchResPanel";
import SortSelection from "./components/sort/sortSelection";

const StyledHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const StyledAppContainer = styled.div`
  text-align: center;
  max-width: 1170px;
  margin: 0 auto;
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
