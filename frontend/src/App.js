import "./app.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import { useContext, useEffect } from "react";
import { refreshToken } from "./context/actions/authAction";
import { StateContext } from "./context/StateProvider";

function App() {
  const [, dispatch] = useContext(StateContext);
  useEffect(() => {
    refreshToken(dispatch);
  }, [dispatch]);

  return (
    <Router>
      <div className="app"></div>
      <Switch>
        <Route exact path="/">
          <Home></Home>
        </Route>
        <Route exact path="/register">
          <Register></Register>
        </Route>
        <Route exact path="/login">
          <Login></Login>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
