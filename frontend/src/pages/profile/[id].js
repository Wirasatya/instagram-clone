import React, { useContext, useEffect, useState } from "react";
import "./profile.scss";

import Info from "../../components/profile/Info";
import Posts from "../../components/profile/Posts";
import Saved from "../../components/profile/Saved";

import LoadIcon from "../../images/loading.gif";
import { getProfileUsers } from "../../context/actions/profileAction";
import { StateContext } from "../../context/StateProvider";
import { useParams } from "react-router-dom";

const Profile = () => {
  const [{ profile, auth }, dispatch] = useContext(StateContext);

  const { id } = useParams();
  const [saveTab, setSaveTab] = useState(false);

  useEffect(() => {
    if (profile.ids.every((item) => item !== id)) {
      getProfileUsers({ id, auth }, dispatch);
    }
  }, [id, auth, dispatch, profile.ids]);

  return (
    <div className="profile">
      <Info auth={auth} profile={profile} dispatch={dispatch} id={id} />

      {auth.user._id === id && (
        <div className="tab">
          <button
            className={saveTab ? "" : "active"}
            onClick={() => setSaveTab(false)}
          >
            Posts
          </button>
          <button
            className={saveTab ? "active" : ""}
            onClick={() => setSaveTab(true)}
          >
            Saved
          </button>
        </div>
      )}

      {profile.loading ? (
        <img className="loading" src={LoadIcon} alt="loading" />
      ) : (
        <>
          {saveTab ? (
            <Saved auth={auth} dispatch={dispatch} />
          ) : (
            <Posts auth={auth} profile={profile} dispatch={dispatch} id={id} />
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
