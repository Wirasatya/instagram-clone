import React, { useContext } from "react";
import { Replay } from "@material-ui/icons";

import UserCard from "../userCard/UserCard";
import FollowBtn from "../followBtn/FollowBtn";
import LoadIcon from "../../images/loading.gif";
import { getSuggestions } from "../../context/actions/suggestionAction";
import { StateContext } from "../../context/StateProvider";

import "./rightSidebar.scss";

const RightSideBar = () => {
  const [{ auth, suggestion }, dispatch] = useContext(StateContext);

  return (
    <div className="rightSidebar">
      <UserCard user={auth.user} />

      <div className="suggestionWrapp">
        <h5 className="textTitle">Suggestions for you</h5>
        {!suggestion.loading && (
          <Replay onClick={() => getSuggestions(auth.token, dispatch)}></Replay>
        )}
      </div>

      {suggestion.loading ? (
        <img src={LoadIcon} alt="loading" className="loadingIcon" />
      ) : (
        <div className="suggestionsList">
          {suggestion.users.map((user) => (
            <UserCard key={user._id} user={user}>
              <FollowBtn user={user} />
            </UserCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default RightSideBar;
