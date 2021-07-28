import React, { createContext, useReducer } from "react";
import auth from "../context/reducers/authReducer";
import alert from "../context/reducers/alertReducer";
import notify from "../context/reducers/notifyReducer";
import theme from "../context/reducers/themeReducer";
import status from "../context/reducers/statusReducer";
import post from "../context/reducers/postReducer";
import profile from "../context/reducers/profileReducer";
import socket from "../context/reducers/socketReducer";
import discover from "../context/reducers/discoverReducer";
import detailPost from "../context/reducers/detailPostReducer";
import call from "../context/reducers/callReducer";
import message from "../context/reducers/messageReducer";
import online from "../context/reducers/onlineReducer";
import peer from "../context/reducers/peerReducer";
import suggestion from "../context/reducers/suggestionReducer";
import modal from "../context/reducers/modalReducer";

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
  profile: {
    loading: false,
    ids: [],
    users: [],
    posts: [],
  },
  socket: [],
  discover: {
    loading: false,
    posts: [],
    result: 9,
    page: 2,
    firstLoad: false,
  },
  detailPost: [],
  call: null,
  message: {
    users: [],
    resultUsers: 0,
    data: [],
    firstLoad: false,
  },
  online: [],
  peer: null,
  suggestion: {
    loading: false,
    users: [],
  },
  modal: false,
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
          profile,
          socket,
          discover,
          detailPost,
          call,
          message,
          online,
          peer,
          suggestion,
          modal,
        }),
        initialState
      )}
    >
      {children}
    </StateContext.Provider>
  );
};
