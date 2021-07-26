import React from "react";
import Menu from "./Menu";
import Search from "./Search";
import { Link } from "react-router-dom";
import "./header.scss";

const Header = () => {
  return (
    <div className="header">
      <nav className="navbar">
        <Link to="/" className="link">
          <h1
            className="iconHeader"
            onClick={() => {
              window.scrollTo({ top: 0 });
            }}
          >
            InstaSocial
          </h1>
        </Link>
        <Search></Search>
        <Menu></Menu>
      </nav>
    </div>
  );
};

export default Header;
