import React, { useContext } from "react";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import { StateContext } from "../../context/StateProvider";
import "./userCard.scss";
import {
  Call,
  InsertPhoto,
  PhoneDisabled,
  Videocam,
  VideocamOff,
} from "@material-ui/icons";

const UserCard = ({
  children,
  user,
  border,
  handleClose,
  setShowFollowers,
  setShowFollowing,
  msg,
}) => {
  const [{ theme }] = useContext(StateContext);

  const handleCloseAll = () => {
    if (handleClose) handleClose();
    if (setShowFollowers) setShowFollowers(false);
    if (setShowFollowing) setShowFollowing(false);
  };

  const showMsg = (user) => {
    return (
      <>
        <div style={{ filter: theme ? "invert(1)" : "invert(0)" }}>
          {user.text}
        </div>
        {user.media.length > 0 && (
          <div>
            {user.media.length}{" "}
            <InsertPhoto className="iconImagesLength"></InsertPhoto>
          </div>
        )}

        {user.call && (
          <span>
            {user.call.times === 0 ? (
              user.call.video ? (
                <VideocamOff className="iconMsgSmall"></VideocamOff>
              ) : (
                <PhoneDisabled className="iconMsgSmall"></PhoneDisabled>
              )
            ) : user.call.video ? (
              <Videocam className="iconMsgSmall"></Videocam>
            ) : (
              <Call className="iconMsgSmall"></Call>
            )}
          </span>
        )}
      </>
    );
  };

  return (
    <div className={`userCard ${border}`}>
      <div>
        <Link
          to={`/profile/${user._id}`}
          onClick={handleCloseAll}
          className="link"
        >
          <Avatar
            style={{
              filter: theme ? "invert(1)" : "invert(0)",
            }}
            src={user.avatar}
            size="medium"
          />
          <div className="infoWrapp">
            <span className="infoName">{user.username}</span>

            <small style={{ opacity: 0.7 }}>
              {msg ? showMsg(user) : user.fullname}
            </small>
          </div>
        </Link>
      </div>
      {children}
    </div>
  );
};

export default UserCard;
