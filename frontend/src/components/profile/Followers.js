import React, { useContext } from "react";
import UserCard from "../userCard/UserCard";
import FollowBtn from "../followBtn/FollowBtn";
import { StateContext } from "../../context/StateProvider";
import "./followers.scss";
const Followers = ({ users, setShowFollowers }) => {
  const [{ auth, theme }] = useContext(StateContext);
  return (
    <div className="followers">
      <div className="box">
        <h5 className="textTitle">Followers</h5>
        <hr />

        <div className="content">
          {users.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              setShowFollowers={setShowFollowers}
            >
              {auth.user._id !== user._id && <FollowBtn user={user} />}
            </UserCard>
          ))}
        </div>

        <div
          style={{ filter: theme ? "invert(1)" : "invert(0)" }}
          className="close"
          onClick={() => setShowFollowers(false)}
        >
          &times;
        </div>
      </div>
    </div>
  );
};

export default Followers;
