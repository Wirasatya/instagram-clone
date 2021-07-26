import React, { createContext, useReducer } from "react";
import auth from "../context/reducers/authReducer";
import alert from "../context/reducers/alertReducer";
import notify from "../context/reducers/notifyReducer";
import theme from "../context/reducers/themeReducer";
import status from "../context/reducers/statusReducer";
import post from "../context/reducers/postReducer";

function combineReducers(reducers) {
  return (state = {}, action) => {
    const newState = {};
    for (let key in reducers) {
      newState[key] = reducers[key](state[key], action);
    }
    return newState;
  };
}

export const initialState = {
  auth: {
    token: null,
    user: null,
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
  status: false,
  post: {
    loading: false,
    posts: [],
    result: 0,
    page: 2,
  },
  homePosts: {
    loading: false,
    posts: [],
    result: 0,
    page: 2,
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
          theme,
          status,
          post,
        }),
        initialState
      )}
    >
      {children}
    </StateContext.Provider>
  );
};
