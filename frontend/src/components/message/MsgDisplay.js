import React, { useContext } from "react";
import { Avatar } from "@material-ui/core";
import { DeleteOutlined } from "@material-ui/icons";
import { imageShow, videoShow } from "../../utils/mediaShow";
import { deleteMessages } from "../../context/actions/messageAction";
import { StateContext } from "../../context/StateProvider";
import Times from "./Times";

const MsgDisplay = ({ user, msg, theme, data }) => {
  const [{ auth }, dispatch] = useContext(StateContext);

  const handleDeleteMessages = () => {
    if (!data) return;

    if (window.confirm("Do you want to delete?")) {
      deleteMessages({ msg, data, auth }, dispatch);
    }
  };

  return (
    <>
      <div className="chatTitle">
        <Avatar src={user.avatar} size="small" />
        <span>{user.username}</span>
      </div>

      <div className="chatContent">
        {user._id === auth.user._id && (
          <DeleteOutlined onClick={handleDeleteMessages}></DeleteOutlined>
        )}

        <div className="msgTextWrapper">
          {msg.text && (
            <div
              className="textChat"
              style={{ filter: theme ? "invert(1)" : "invert(0)" }}
            >
              {msg.text}
            </div>
          )}
          {msg.media.map((item, index) => (
            <div key={index}>
              {item.url.match(/video/i)
                ? videoShow(item.url, theme)
                : imageShow(item.url, theme)}
            </div>
          ))}
        </div>

        {msg.call && (
          <button
            className="buttonCall"
            style={{ background: "#eee", borderRadius: "10px" }}
          >
            <span
              className="msgCallWrapper"
              style={{
                fontSize: "2.5rem",
                color: msg.call.times === 0 ? "crimson" : "green",
                filter: theme ? "invert(1)" : "invert(0)",
              }}
            >
              {msg.call.times === 0
                ? msg.call.video
                  ? "videocam_off"
                  : "phone_disabled"
                : msg.call.video
                ? "video_camera_front"
                : "call"}
            </span>

            <div className="textLeftMsg">
              <h6>{msg.call.video ? "Video Call" : "Audio Call"}</h6>
              <small>
                {msg.call.times > 0 ? (
                  <Times total={msg.call.times} />
                ) : (
                  new Date(msg.createdAt).toLocaleTimeString()
                )}
              </small>
            </div>
          </button>
        )}
      </div>

      <div className="timesChat">
        {new Date(msg.createdAt).toLocaleString()}
      </div>
    </>
  );
};

export default MsgDisplay;
