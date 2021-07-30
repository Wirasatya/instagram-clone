import React from "react";
import "./message.scss";
import LeftSide from "../../components/message/LeftSide";
import RightSide from "../../components/message/RightSide";

const Conversation = () => {
  return (
    <div className="messagePage">
      <div className="leftMessage">
        <LeftSide />
      </div>

      <div className="rightMessage">
        <RightSide />
      </div>
    </div>
  );
};

export default Conversation;
