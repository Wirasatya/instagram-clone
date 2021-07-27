import React, { useState, useEffect, useContext } from "react";
import { follow, unfollow } from "../../context/actions/profileAction";
import { StateContext } from "../../context/StateProvider";
import "./followBtn.scss";
const FollowBtn = ({ user }) => {
  const [followed, setFollowed] = useState(false);

  const [{ auth, profile, socket, theme }, dispatch] = useContext(StateContext);

  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (auth.user.following.find((item) => item._id === user._id)) {
      setFollowed(true);
    }
    return () => setFollowed(false);
  }, [auth.user.following, user._id]);

  const handleFollow = async () => {
    if (load) return;

    setFollowed(true);
    setLoad(true);
    await follow({ users: profile.users, user, auth, socket }, dispatch);
    setLoad(false);
  };

  const handleUnFollow = async () => {
    if (load) return;

    setFollowed(false);
    setLoad(true);
    await unfollow({ users: profile.users, user, auth, socket }, dispatch);
    setLoad(false);
  };

  return (
    <>
      {followed ? (
        <button
          className="buttonUnfollowModal"
          onClick={handleUnFollow}
          style={{ filter: theme ? "invert(1)" : "invert(0)" }}
        >
          UnFollow
        </button>
      ) : (
        <button
          className="buttonFollowModal"
          onClick={handleFollow}
          style={{ filter: theme ? "invert(1)" : "invert(0)" }}
        >
          Follow
        </button>
      )}
    </>
  );
};

export default FollowBtn;
