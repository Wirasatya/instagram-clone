import React from "react";
import { Close } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import "./toast.scss";

const Toast = ({ msg, handleShow, bgColor }) => {
  return (
    <div className={`toast ${bgColor}`}>
      <div className={`header ${bgColor}`}>
        <strong className="textTitle">{msg.title}</strong>
        <IconButton className="button" onClick={handleShow}>
          <Close className="icon"></Close>
        </IconButton>
      </div>
      <div className="body">{msg.body}</div>
    </div>
  );
};

export default Toast;
