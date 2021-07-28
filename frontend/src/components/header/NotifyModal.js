import React, { useContext } from "react";
import NoNotice from "../../images/notice.png";
import { Link } from "react-router-dom";
import { Avatar, IconButton } from "@material-ui/core";
import {
  FiberManualRecord,
  NotificationsActive,
  NotificationsOff,
} from "@material-ui/icons";
import moment from "moment";
import {
  isReadNotify,
  NOTIFY_TYPES,
  deleteAllNotifies,
} from "../../context/actions/notifyAction";
import { StateContext } from "../../context/StateProvider";
import "./notifyModal.scss";

const NotifyModal = () => {
  const [{ auth, notify }, dispatch] = useContext(StateContext);
  const handleIsRead = (msg) => {
    isReadNotify({ msg, auth }, dispatch);
  };
  const handleSound = () => {
    dispatch({ type: NOTIFY_TYPES.UPDATE_SOUND, payload: !notify.sound });
  };

  const handleDeleteAll = () => {
    const newArr = notify.data.filter((item) => item.isRead === false);
    if (newArr.length === 0) return deleteAllNotifies(auth.token, dispatch);

    if (
      window.confirm(
        `You have ${newArr.length} unread notices. Are you sure you want to delete all?`
      )
    ) {
      return deleteAllNotifies(auth.token, dispatch);
    }
  };

  return (
    <div className="notifyModal">
      <div className="headerModal">
        <h3>Notification</h3>
        {notify.sound ? (
          <IconButton
            className="button"
            style={{ fontSize: "1.2rem", cursor: "pointer" }}
            onClick={handleSound}
          >
            <NotificationsActive
              className="icon"
              style={{ color: "crimson" }}
            ></NotificationsActive>
          </IconButton>
        ) : (
          <IconButton
            className="button"
            style={{ fontSize: "1.2rem", cursor: "pointer" }}
            onClick={handleSound}
          >
            <NotificationsOff className="icon"></NotificationsOff>
          </IconButton>
        )}
      </div>
      <hr />

      {notify.data.length === 0 && (
        <img src={NoNotice} alt="NoNotice" className="img" />
      )}

      <div className="listNotify" style={{}}>
        {notify.data.map((msg, index) => (
          <div key={index} className="px-2 mb-3">
            <Link
              to={`${msg.url}`}
              className="link"
              onClick={() => handleIsRead(msg)}
            >
              <Avatar src={msg.user.avatar} size="medium" />

              <div className="infoWrap">
                <div>
                  <strong className="infoName">{msg.user.username}</strong>
                  <span>{msg.text}</span>
                </div>
                {msg.content && <small>{msg.content.slice(0, 20)}...</small>}
              </div>

              {msg.image && (
                <div style={{ width: "30px" }}>
                  {msg.image.match(/video/i) ? (
                    <video src={msg.image} width="100%" />
                  ) : (
                    <Avatar src={msg.image} size="medium" />
                  )}
                </div>
              )}
            </Link>
            <small className="timeMoment">
              {moment(msg.createdAt).fromNow()}
              {!msg.isRead && <FiberManualRecord className="iconRead" />}
            </small>
          </div>
        ))}
      </div>

      <hr />
      <div
        className="deleteText"
        style={{ cursor: "pointer" }}
        onClick={handleDeleteAll}
      >
        Delete All
      </div>
    </div>
  );
};

export default NotifyModal;
