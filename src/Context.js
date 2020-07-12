import React, { useReducer, createContext } from "react";

const initialData = {
  searchField: "",
  authToken: "f9e3e97bc834ee1edee7a26e98b78f07c0e4fb9e",
  topStocks: "",
  bottomStocks: "",
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
    case "update token": {
      return { ...state, authToken: action.token};
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
