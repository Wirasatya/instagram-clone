import React, { useState, useContext, useEffect } from "react";
import { register } from "../../context/actions/authAction";
import { StateContext } from "../../context/StateProvider";
import { useHistory, Link } from "react-router-dom";
import "./register.scss";

const Register = () => {
  const history = useHistory();
  const [{ auth, alert }, dispatch] = useContext(StateContext);

  const initialState = {
    fullname: "",
    username: "",
    email: "",
    password: "",
    cf_password: "",
    gender: "male",
  };
  const [userData, setUserData] = useState(initialState);
  const { fullname, username, email, password, cf_password } = userData;

  const [typePass, setTypePass] = useState(false);
  const [typeCfPass, setTypeCfPass] = useState(false);

  useEffect(() => {
    console.log(auth);
    console.log(alert);
  }, [alert, auth]);

  useEffect(() => {
    if (auth.token) history.push("/");
  }, [auth.token, history]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register(userData, dispatch);
  };
  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <h3 className="title">InstaSocial</h3>

        <div className="form-group">
          <label htmlFor="fullname">Full Name</label>
          <input
            type="text"
            className="form-control"
            id="fullname"
            name="fullname"
            onChange={handleChangeInput}
            value={fullname}
            style={{ background: `${alert.fullname ? "#fd2d6a14" : ""}` }}
          />

          <small className="smallAlert">
            {alert.fullname ? alert.fullname : ""}
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="username">User Name</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            onChange={handleChangeInput}
            value={username.toLowerCase().replace(/ /g, "")}
            style={{ background: `${alert.username ? "#fd2d6a14" : ""}` }}
          />

          <small className="smallAlert">
            {alert.username ? alert.username : ""}
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            name="email"
            onChange={handleChangeInput}
            value={email}
            style={{ background: `${alert.email ? "#fd2d6a14" : ""}` }}
          />

          <small className="form-text text-danger">
            {alert.email ? alert.email : ""}
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>

          <div className="passWrap">
            <input
              type={typePass ? "text" : "password"}
              className="password"
              id="exampleInputPassword1"
              onChange={handleChangeInput}
              value={password}
              name="password"
              style={{ background: `${alert.password ? "#fd2d6a14" : ""}` }}
            />

            <small className="showHide" onClick={() => setTypePass(!typePass)}>
              {typePass ? "Hide" : "Show"}
            </small>
          </div>

          <small className="passAlert">
            {alert.password ? alert.password : ""}
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="cf_password">Confirm Password</label>

          <div className="passWrap">
            <input
              type={typeCfPass ? "text" : "password"}
              className="password"
              id="cf_password"
              onChange={handleChangeInput}
              value={cf_password}
              name="cf_password"
              style={{ background: `${alert.cf_password ? "#fd2d6a14" : ""}` }}
            />

            <small
              className="showHide"
              onClick={() => setTypeCfPass(!typeCfPass)}
            >
              {typeCfPass ? "Hide" : "Show"}
            </small>
          </div>

          <small className="passAlert">
            {alert.cf_password ? alert.cf_password : ""}
          </small>
        </div>

        <div className="selectWrap">
          <label htmlFor="male">
            Male:{" "}
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              defaultChecked
              onChange={handleChangeInput}
            />
          </label>

          <label htmlFor="female">
            Female:{" "}
            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              onChange={handleChangeInput}
            />
          </label>

          <label htmlFor="other">
            Other:{" "}
            <input
              type="radio"
              id="other"
              name="gender"
              value="other"
              onChange={handleChangeInput}
            />
          </label>
        </div>

        <button type="submit" className="submit">
          Register
        </button>

        <p className="pText">
          Already have an account?{" "}
          <Link to="/" style={{ color: "crimson" }}>
            Login Now
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
