import "./app.scss";

import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
// import Discover from "./pages/discover/Discover";
import Login from "./pages/login/Login";

import { useContext, useEffect } from "react";
import { refreshToken } from "./context/actions/authAction";
import { getNotifies } from "./context/actions/notifyAction";
import { StateContext } from "./context/StateProvider";

import PrivateRouter from "./router/PrivateRouter";
import PageRender from "./router/PageRender";

import Notify from "./components/alert/Notify";
import Header from "./components/header/Header";
import { getPosts } from "./context/actions/postAction";

import io from "socket.io-client";
import { GLOBALTYPES } from "./context/globalTypes";
import SocketClient from "./SocketClient";
import StatusModal from "./components/statusModal/StatusModal";
import { getSuggestions } from "./context/actions/suggestionAction";
import CallModal from "./components/message/CallModal";

import Peer from "peerjs";

function App() {
  const [{ auth, status, modal, call }, dispatch] = useContext(StateContext);
  useEffect(() => {
    refreshToken(dispatch);
  }, [dispatch]);

  useEffect(() => {
    const socket = io();
    dispatch({ type: GLOBALTYPES.SOCKET, payload: socket });
    return () => socket.close();
  }, [dispatch]);

  useEffect(() => {
    if (auth.token) {
      getPosts(auth.token, dispatch);
      getSuggestions(auth.token, dispatch);
      getNotifies(auth.token, dispatch);
    }
  }, [dispatch, auth.token]);

  useEffect(() => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
        }
      });
    }
  }, []);

  useEffect(() => {
    const newPeer = new Peer(undefined, {
      path: "/",
      secure: true,
    });

    dispatch({ type: GLOBALTYPES.PEER, payload: newPeer });
  }, [dispatch]);

  return (
    <Router>
      <Notify></Notify>
      <input type="checkbox" id="theme" />
      <div className={`app ${(status || modal) && "mode"}`}>
        <div className="main">
          {auth.token && <Header />}
          {status && <StatusModal />}
          {auth.token && <SocketClient />}
          {call && <CallModal />}

          <Route exact path="/" component={auth.token ? Home : Login} />
          <Route exact path="/register" component={Register} />
          {/* <Route exact path="/discover" component={Register} /> */}

          <PrivateRouter exact path="/:page">
            <PageRender auth={auth}></PageRender>
          </PrivateRouter>
          <PrivateRouter exact path="/:page/:id">
            <PageRender auth={auth}></PageRender>
          </PrivateRouter>
        </div>
      </div>
    </Router>
  );
}

export default App;
