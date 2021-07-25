import React, { createContext, useReducer } from "react";
import auth from "../context/reducers/authReducer";
import alert from "../context/reducers/alertReducer";
import notify from "../context/reducers/notifyReducer";

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
    loading: false,
    success: null,
    error: null,
  },
  theme: false,
  notify: {
    data: [],
    loading: false,
    sound: false,
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
          notify,
        }),
        initialState
      )}
    >
      {children}
    </StateContext.Provider>
  );
};
