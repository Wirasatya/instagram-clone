import React, { createContext, useReducer } from "react";
import auth from "../context/reducers/authReducer";
import alert from "../context/reducers/alertReducer";

function combineReducers(reducers) {
  return (state = {}, action) => {
    const newState = {};
    for (let key in reducers) {
      newState[key] = reducers[key](state[key], action);
    }
    return newState;
  };
}

const initialState = {
  auth: {
    token: null,
  },
  alert: {
    fullname: null,
    email: null,
  },
};

export const StateContext = createContext();
// Build the provider
export const StateProvider = ({ children }) => {
  return (
    <StateContext.Provider
      value={useReducer(
        combineReducers({
          auth,
          alert,
        }),
        initialState
      )}
    >
      {children}
    </StateContext.Provider>
  );
};
