import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Send from "../../images/send.svg";
import LikeButton from "../likeButton/LikeButton";
import {
  likePost,
  unLikePost,
  savePost,
  unSavePost,
} from "../../context/actions/postAction";
import { StateContext } from "../../context/StateProvider";
import ShareModal from "../shareModal/ShareModal";
import { BASE_URL } from "../../utils/config";
import { Bookmark, BookmarkBorder, InsertComment } from "@material-ui/icons";
import "./cardFooter.scss";

const CardFooter = ({ post }) => {
  const [isLike, setIsLike] = useState(false);
  const [loadLike, setLoadLike] = useState(false);

  const [isShare, setIsShare] = useState(false);

  const [{ auth, theme, socket }, dispatch] = useContext(StateContext);

  const [saved, setSaved] = useState(false);
  const [saveLoad, setSaveLoad] = useState(false);

  // Likes
  useEffect(() => {
    if (post.likes.find((like) => like._id === auth.user._id)) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, [post.likes, auth.user._id]);

  const handleLike = async () => {
    if (loadLike) return;

    setLoadLike(true);
    await dispatch(likePost({ post, auth, socket }));
    setLoadLike(false);
  };

  const handleUnLike = async () => {
    if (loadLike) return;

    setLoadLike(true);
    await dispatch(unLikePost({ post, auth, socket }));
    setLoadLike(false);
  };

  // Saved
  useEffect(() => {
    if (auth.user.saved.find((id) => id === post._id)) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  }, [auth.user.saved, post._id]);

  const handleSavePost = async () => {
    if (saveLoad) return;

    setSaveLoad(true);
    await dispatch(savePost({ post, auth }));
    setSaveLoad(false);
  };

  const handleUnSavePost = async () => {
    if (saveLoad) return;

    setSaveLoad(true);
    await dispatch(unSavePost({ post, auth }));
    setSaveLoad(false);
  };

  return (
    <div className="cardFooter">
      <div className="leftFooter">
        <div className="iconWrapper">
          <LikeButton
            isLike={isLike}
            handleLike={handleLike}
            handleUnLike={handleUnLike}
          />
          <Link to={`/post/${post._id}`} className="link">
            <InsertComment
              style={{ fontSize: "40px", marginLeft: "5px" }}
            ></InsertComment>
          </Link>

          <img src={Send} alt="Send" onClick={() => setIsShare(!isShare)} />
        </div>

        {saved ? (
          <Bookmark
            className="iconSaveUnsave"
            onClick={handleUnSavePost}
          ></Bookmark>
        ) : (
          <BookmarkBorder
            className="iconSaveUnsave"
            onClick={handleSavePost}
          ></BookmarkBorder>
        )}
      </div>

      <div className="rightFooter">
        <h6 style={{ padding: "0 25px", cursor: "pointer" }}>
          {post.likes.length} likes
        </h6>

        <h6 style={{ padding: "0 25px", cursor: "pointer" }}>
          {post.comments.length} comments
        </h6>
      </div>

      {isShare && (
        <ShareModal url={`${BASE_URL}/post/${post._id}`} theme={theme} />
      )}
    </div>
  );
};

export default CardFooter;
