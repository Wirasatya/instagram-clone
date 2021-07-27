import "./status.scss";
import React, { useContext } from "react";
import { Avatar } from "@material-ui/core";
import { GLOBALTYPES } from "../../context/globalTypes";
import { StateContext } from "../../context/StateProvider";

const Status = () => {
  const [{ auth, theme }, dispatch] = useContext(StateContext);
  return (
    <div className="status">
      <Avatar
        style={{
          filter: theme ? "invert(1)" : "invert(0)",
        }}
        className="avatarStatus"
        src={auth.user.avatar}
        size="medium"
      />

      <button
        className="buttonStatus"
        onClick={() => dispatch({ type: GLOBALTYPES.STATUS, payload: true })}
      >
        {auth.user.username}, what are you thinking?
      </button>
    </div>
  );
};

export default Status;
