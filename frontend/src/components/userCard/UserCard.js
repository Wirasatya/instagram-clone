import React, { useContext } from "react";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import { StateContext } from "../../context/StateProvider";
import "./userCard.scss";

const UserCard = ({
  children,
  user,
  border,
  handleClose,
  setShowFollowers,
  setShowFollowing,
  msg,
}) => {
  const { theme } = useContext(StateContext);

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
            {user.media.length} <i className="fas fa-image" />
          </div>
        )}

        {user.call && (
          <span className="material-icons">
            {user.call.times === 0
              ? user.call.video
                ? "videocam_off"
                : "phone_disabled"
              : user.call.video
              ? "video_camera_front"
              : "call"}
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
          <Avatar src={user.avatar} size="medium" />
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
