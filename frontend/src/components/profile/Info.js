import React, { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import EditProfile from "./EditProfile";
import FollowBtn from "../followBtn/FollowBtn";
import Followers from "./Followers";
import Following from "./Followings";
import { GLOBALTYPES } from "../../context/globalTypes";
import "./info.scss";

const Info = ({ theme, id, auth, profile, dispatch }) => {
  const [userData, setUserData] = useState([]);
  const [onEdit, setOnEdit] = useState(false);

  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  useEffect(() => {
    if (id === auth.user._id) {
      setUserData([auth.user]);
    } else {
      const newData = profile.users.filter((user) => user._id === id);
      setUserData(newData);
    }
  }, [id, auth, dispatch, profile.users]);

  useEffect(() => {
    if (showFollowers || showFollowing || onEdit) {
      dispatch({ type: GLOBALTYPES.MODAL, payload: true });
    } else {
      dispatch({ type: GLOBALTYPES.MODAL, payload: false });
    }
  }, [showFollowers, showFollowing, onEdit, dispatch]);

  return (
    <div className="info">
      {userData.map((user) => (
        <div className="container" key={user._id}>
          <Avatar
            src={user.avatar}
            className="avatarIcon"
            size="medium"
            style={{ filter: theme ? "invert(1)" : "invert(0)" }}
          />

          <div className="content">
            <div className="contentTitle">
              <h2>{user.username}</h2>
              {user._id === auth.user._id ? (
                <button className="buttonEdit" onClick={() => setOnEdit(true)}>
                  Edit Profile
                </button>
              ) : (
                <FollowBtn user={user} />
              )}
            </div>

            <div className="buttonFollow">
              <span
                className="textFollowers"
                onClick={() => setShowFollowers(true)}
              >
                {user.followers.length} Followers
              </span>
              <span
                className="textFollowings"
                onClick={() => setShowFollowing(true)}
              >
                {user.following.length} Following
              </span>
            </div>

            <h6>
              {user.fullname} <span className="textMobile">{user.mobile}</span>
            </h6>
            <p className="textAddress">{user.address}</p>
            <h6 className="textEmail">{user.email}</h6>
            <a
              href={user.website}
              className="textWebsite"
              target="_blank"
              rel="noreferrer"
            >
              {user.website}
            </a>
            <p className="textStory">{user.story}</p>
          </div>

          {onEdit && <EditProfile setOnEdit={setOnEdit} />}

          {showFollowers && (
            <Followers
              users={user.followers}
              setShowFollowers={setShowFollowers}
            />
          )}
          {showFollowing && (
            <Following
              users={user.following}
              setShowFollowing={setShowFollowing}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Info;
