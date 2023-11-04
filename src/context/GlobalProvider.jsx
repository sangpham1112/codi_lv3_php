import React, { createContext, useReducer } from "react";
import AppReducer from "~/context/reducer/AppReducer";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) ?? [],
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions for changing state

  function SaveLoginUser(user) {
    dispatch({
      type: "GOOGLE_LOGIN",
      payload: user,
    });
  }

  function Logout() {
    dispatch({
      type: "LOG_OUT",
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        user: state.user,
        SaveLoginUser,
        Logout,
      }}>
      {children}
    </GlobalContext.Provider>
  );
};
