import React from "react";
import LeftSide from "../../components/message/LeftSide";
import { Telegram } from "@material-ui/icons";
import "./message.scss";

const Message = () => {
  return (
    <div className="messagePage">
      <div className="leftMessage">
        <LeftSide />
      </div>

      <div className="rightMessage">
        <div className="titleWrapper">
          <Telegram style={{ fontSize: "5rem" }}></Telegram>
          <h4>Messenger</h4>
        </div>
      </div>
    </div>
  );
};

export default Message;
