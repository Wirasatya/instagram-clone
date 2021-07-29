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
      className="iconsEmoji"
      style={{ opacity: 1, filter: theme ? "invert(1)" : "invert(0)" }}
    >
      <span
        style={{ opacity: show ? "0.4" : "1" }}
        className="spanIcon"
        onClick={handleShow}
      >
        😄
      </span>
      {/* <EmojiEmotions ></EmojiEmotions> */}

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
