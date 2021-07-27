import React, { useContext } from "react";
import "./followings.scss";
import UserCard from "../userCard/UserCard";
import FollowBtn from "../followBtn/FollowBtn";
import { StateContext } from "../../context/StateProvider";

const Followings = ({ users, setShowFollowing }) => {
  const [{ auth, theme }] = useContext(StateContext);
  return (
    <div className="followings">
      <div className="box">
        <h5 className="textTitle">Following</h5>
        <hr />

        <div className="content">
          {users.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              setShowFollowing={setShowFollowing}
            >
              {auth.user._id !== user._id && <FollowBtn user={user} />}
            </UserCard>
          ))}
        </div>
        <div
          style={{ filter: theme ? "invert(1)" : "invert(0)" }}
          className="close"
          onClick={() => setShowFollowing(false)}
        >
          &times;
        </div>
      </div>
    </div>
  );
};

export default Followings;
