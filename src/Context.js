import React, { useReducer, createContext } from "react";

const initialData = {
  searchField: "",
  topStocks: "",
  bottomStocks: "",
  suggestions: [],
  stocks: [],
  stockPrices: [],
  authToken: "",
  user: {},
};

export const CapitalizerContext = createContext([initialData, () => {}]);

function capitalizerReducer(state, action) {
  switch (action.type) {
    case "update search": {
      return { ...state, searchField: action.searchField };
    }
    case "update top stocks": {
      return { ...state, topStocks: action.topStocks};
    }
    case "update bottom stocks": {
      return { ...state, bottomStocks: action.bottomStocks};
    }
    case "update suggestions": {
      return { ...state, suggestions: action.suggestions};
    }
    case "update stocks": {
      return { ...state, stocks: action.stocks};
    }
    case "update stock prices": {
      return { ...state, stockPrices: action.stockPrices};
    }
    case "update token": {
      return { ...state, authToken: action.token};
    }
    case "update user": {
      return { ...state, user: action.user};
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

export function CapitalizerProvider({ children }) {
  const [state, dispatch] = useReducer(capitalizerReducer, initialData);
  return (
    <CapitalizerContext.Provider value={[state, dispatch]}>
      {children}
    </CapitalizerContext.Provider>
  );
}
