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
    "",
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
        <span style={{ opacity: 0.4 }}>😄</span>
      </span>

      {show && (
        <div className="dropdownMenu" aria-labelledby="navbarDropdown">
          <div className="reactions">
            {reactions.map((icon) => (
              <span key={icon} onClick={() => setContent(content + icon)}>
                {icon}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Icons;
