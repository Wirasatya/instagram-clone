import React, { useState } from "react";
import "./icons.scss";

const Icons = ({ setContent, content, theme }) => {
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(!show);
  };
  const reactions = [
    "❤️",
    "😆",
    "😯",
    "😢",
    "😡",
    "👍",
    "👎",
    "😄",
    "😂",
    "🤣",
    "😘",
    "😗",
    "😚",
    "😳",
    "😭",
    "😓",
    "😤",
    "🤤",
    "👻",
    "💀",
    "🤐",
    "😴",
    "😷",
    "😵",
  ];

  return (
    <div
      className="icons"
      style={{ opacity: 1, filter: theme ? "invert(1)" : "invert(0)" }}
    >
      <span
        className="spanIcon"
        id="navbarDropdown"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        onClick={handleShow}
      >
        <span style={{ opacity: show ? "0.4" : "1" }}>😄</span>
      </span>

      {show && (
        <div className="reactions">
          {reactions.map((icon) => (
            <span key={icon} onClick={() => setContent(content + icon)}>
              {icon}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default Icons;
