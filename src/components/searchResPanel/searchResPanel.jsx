import React from "react";
import SearchResItem from "../searchResItem/resItem";
import styled from "styled-components";
import { Tabs } from "antd";
import LazyLoad from "react-lazyload";
import { useAppContext } from "../../AppContext";
import loadingIcon from "../../assets/img/icon_loading.svg";

const StyledSearchPanel = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledIconLoading = styled.div`
  img {
    width: 50px;
  }
`;

const LoadingCmp = () => (
  <StyledIconLoading>
    <img src={loadingIcon} alt="loading" />
  </StyledIconLoading>
);

const SearchResPanel = () => {
  const [{ searchResult, isLoading }] = useAppContext();
  const { TabPane } = Tabs;

  const searchList = searchResult.filter(item => item.action !== "remove");
  const likedData = searchResult.filter(item => item.action === "like");
  const removedData = searchResult.filter(item => item.action === "remove");

  return (
    <Tabs defaultActiveKey="tab_all">
      <TabPane tab="All Data" key="tab_all">
        {isLoading ? (
          <LoadingCmp />
        ) : (
          <StyledSearchPanel>
            {searchList.length ? (
              searchList.map(item => {
                return (
                  <LazyLoad key={item.nasa_id} placeholder={<LoadingCmp />}>
                    <SearchResItem item={item} />
                  </LazyLoad>
                );
              })
            ) : (
              <h2>Data not found</h2>
            )}
          </StyledSearchPanel>
        )}
      </TabPane>
      <TabPane tab="Liked Data" key="tab_liked">
        {
          <StyledSearchPanel>
            {likedData.length ? (
              likedData.map(item => {
                return <SearchResItem item={item} key={item.nasa_id} />;
              })
            ) : (
              <h2>Data not found</h2>
            )}
          </StyledSearchPanel>
        }
      </TabPane>
      <TabPane tab="Removed Data" key="tab_removed">
        {
          <StyledSearchPanel>
            {removedData.length ? (
              removedData.map(item => {
                return <SearchResItem item={item} key={item.nasa_id} />;
              })
            ) : (
              <h2>Data not found</h2>
            )}
          </StyledSearchPanel>
        }
      </TabPane>
    </Tabs>
  );
};

export default SearchResPanel;
