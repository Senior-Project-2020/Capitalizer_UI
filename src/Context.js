import React, { useReducer, createContext } from "react";

const initialData = {
  searchField: "",
  user: {},
};

export const CapitalizerContext = createContext([initialData, () => {}]);

function capitalizerReducer(state, action) {
  switch (action.type) {
    case "update search": {
      return { ...state, searchField: action.searchField };
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
