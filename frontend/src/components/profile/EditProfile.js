import React, { useState, useEffect, useContext } from "react";
import "./editProfile.scss";
import { CameraAltOutlined } from "@material-ui/icons";

import { checkImage } from "../../utils/imageUpload";
import { GLOBALTYPES } from "../../context/globalTypes";
import { StateContext } from "../../context/StateProvider";
import { updateProfileUser } from "../../context/actions/profileAction";
import { Avatar } from "@material-ui/core";

const EditProfile = ({ setOnEdit }) => {
  const initState = {
    fullname: "",
    mobile: "",
    address: "",
    website: "",
    story: "",
    gender: "",
  };
  const [userData, setUserData] = useState(initState);
  const { fullname, mobile, address, website, story, gender } = userData;

  const [avatar, setAvatar] = useState("");

  const [{ auth, theme, alert }, dispatch] = useContext(StateContext);

  useEffect(() => {
    setUserData(auth.user);
  }, [auth.user]);

  const changeAvatar = (e) => {
    const file = e.target.files[0];

    const err = checkImage(file);
    if (err)
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err },
      });

    setAvatar(file);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfileUser({ userData, avatar, auth }, dispatch);
  };

  return (
    <div className="editProfile">
      {!alert.loading && (
        <>
          <button className="buttonClose" onClick={() => setOnEdit(false)}>
            Close
          </button>

          <form className="form" onSubmit={handleSubmit}>
            <div className="avatarWrapper">
              <Avatar
                src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
                alt="avatar"
                style={{ filter: theme ? "invert(1)" : "invert(0)" }}
                className="avatar"
              />
              <span>
                <CameraAltOutlined className="iconCamera"></CameraAltOutlined>
                <p>Change</p>
                <input
                  type="file"
                  name="file"
                  id="file_up"
                  className="inputFile"
                  accept="image/*"
                  onChange={changeAvatar}
                />
              </span>
            </div>

            <div className="inputContainer">
              <label htmlFor="fullname">Full Name</label>
              <div className="inputWrapper">
                <input
                  type="text"
                  className="input"
                  id="fullname"
                  name="fullname"
                  value={fullname}
                  onChange={handleInput}
                />
                <small className="smallInput">{fullname.length}/25</small>
              </div>
            </div>

            <div className="inputContainer">
              <label htmlFor="mobile">Mobile</label>
              <input
                type="text"
                name="mobile"
                value={mobile}
                className="input"
                onChange={handleInput}
              />
            </div>

            <div className="inputContainer">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                value={address}
                className="input"
                onChange={handleInput}
              />
            </div>

            <div className="inputContainer">
              <label htmlFor="website">Website</label>
              <input
                type="text"
                name="website"
                value={website}
                className="input"
                onChange={handleInput}
              />
            </div>

            <div className="inputContainer">
              <label htmlFor="story">Story</label>
              <textarea
                name="story"
                value={story}
                cols="30"
                rows="4"
                className="input"
                onChange={handleInput}
              />

              <small className="smallStory">{story.length}/200</small>
            </div>

            <label htmlFor="gender">Gender</label>
            <div className="selectContainer">
              <select
                name="gender"
                id="gender"
                value={gender}
                className="selectGender"
                onChange={handleInput}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <button className="buttonSubmit" type="submit">
              Save
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default EditProfile;
