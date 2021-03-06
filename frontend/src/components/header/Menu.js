import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Telegram,
  Explore,
  Favorite,
  ArrowDropDown,
} from "@material-ui/icons";
import { StateContext } from "../../context/StateProvider";
import "./menu.scss";
import { Avatar, IconButton } from "@material-ui/core";
import { logout } from "../../context/actions/authAction";
import NotifyModal from "./NotifyModal";
import { GLOBALTYPES } from "../../context/globalTypes";

const Menu = () => {
  const [showNotify, setShowNotify] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navLinks = [
    { label: "Home", icon: "home", path: "/" },
    { label: "Message", icon: "near_me", path: "/message" },
    { label: "Discover", icon: "explore", path: "/discover" },
  ];
  const iconUI = (label) => {
    if (label === "Home") return <Home className="icon" />;
    if (label === "Message") return <Telegram className="icon" />;
    if (label === "Discover") return <Explore className="icon" />;
  };

  const [{ auth, theme, notify }, dispatch] = useContext(StateContext);
  const { pathname } = useLocation();

  const isActive = (pn) => {
    if (pn === pathname) return "active";
  };
  return (
    <div className="menuHeader">
      <ul className="navbarMenu">
        {navLinks.map((link) => (
          <li className={`listMenu ${isActive(link.path)}`} key={link.label}>
            <Link className="link" to={link.path}>
              <IconButton className="button" size="medium">
                {iconUI(link.label)}
              </IconButton>
            </Link>
          </li>
        ))}
        <li className="listDropdown" style={{ opacity: 1 }}>
          <div className="dropdown">
            <IconButton
              className="button"
              onClick={() => {
                setShowNotify(!showNotify);
                setShowDropdown(false);
              }}
            >
              <Favorite className="icon"></Favorite>
              <span className="notifyLength">{notify.data.length}</span>
            </IconButton>
          </div>
          <div
            className="dropdownContentNotify"
            aria-labelledby="navbarDropdown"
            style={{
              display: showNotify ? "block" : "none",
            }}
          >
            {showNotify && <NotifyModal />}
          </div>
        </li>
        <li className="listDropdown" style={{ opacity: 1 }}>
          <div className="dropdown">
            <Avatar
              src={auth.user.avatar}
              size="small"
              style={{ filter: theme ? "invert(1)" : "invert(0)" }}
            />
            <ArrowDropDown
              className="iconDown"
              onClick={() => {
                setShowNotify(false);
                setShowDropdown(!showDropdown);
              }}
            ></ArrowDropDown>
          </div>
          {showDropdown && (
            <div className="dropdownContent" aria-labelledby="navbarDropdown">
              <Link
                onClick={() => setShowDropdown(!showDropdown)}
                className="link"
                to={`/profile/${auth.user._id}`}
              >
                Profile
              </Link>

              <label
                htmlFor="theme"
                className="themeMode"
                onClick={() => {
                  dispatch({
                    type: GLOBALTYPES.THEME,
                    payload: !theme,
                  });
                }}
              >
                {theme ? "Light mode" : "Dark mode"}
              </label>
              <hr />
              <Link className="link" to="/" onClick={() => logout(dispatch)}>
                Logout
              </Link>
            </div>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Menu;
