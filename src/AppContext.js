import React, { useContext, useCallback, useReducer } from "react";

export const appData = {
  searchResult: [],
  isLoading: false
};

export const AppContext = React.createContext({});

export const AppContextProvider = props => {
  const { children } = props;
  const [data, dispatch] = useReducer(reducer, appData);
  console.log(data.searchResult, "data");
  return (
    <AppContext.Provider value={{ data, setData: dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

const reducer = (initState, action = {}) => {
  switch (action.type) {
    case "SET_BUTTON_ACTION": {
      const { nasa_id, actionType } = action.payload;
      console.log(initState.searchResult, "initialState");
      return {
        ...initState,
        searchResult: initState.searchResult.map(data =>
          data.nasa_id === nasa_id
            ? {
                ...data,
                action: actionType,
                isEdit: actionType === "edit",
                isLike: actionType === "like",
                isRemove: actionType === "remove"
              }
            : data
        )
      };
    }
    case "SET_SEARCH_DATA":
      return {
        ...initState,
        ...action.payload
      };
    case "SET_LOADING":
      return {
        ...initState,
        isLoading: true
      };
    case "SET_EDIT":
      const { nasa_id } = action.payload;
      return {
        ...initState,
        searchResult: initState.searchResult.map(data =>
          data.nasa_id === nasa_id ? { ...data, ...action.payload } : data
        )
      };
    default:
      return {
        ...initState,
        searchResult: action.payload
      };
  }
};

export const useAppContext = () => {
  const { data, setData } = useContext(AppContext);

  const setAction = useCallback(
    (nextData, actionType) => {
      setData({ payload: nextData, type: actionType });
    },
    [setData]
  );

  return [data, setAction];
};
