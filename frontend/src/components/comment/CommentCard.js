import React, { useState, useEffect, useContext } from "react";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import moment from "moment";

import LikeButton from "../likeButton/LikeButton";
import CommentMenu from "./CommentMenu";
import {
  updateComment,
  likeComment,
  unLikeComment,
} from "../../context/actions/commentAction";
import InputComment from "../postCard/InputComment";
import { StateContext } from "../../context/StateProvider";

import "./commentCard.scss";

const CommentCard = ({ children, comment, post, commentId }) => {
  const [{ auth, theme }, dispatch] = useContext(StateContext);

  const [content, setContent] = useState("");
  const [readMore, setReadMore] = useState(false);

  const [onEdit, setOnEdit] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [loadLike, setLoadLike] = useState(false);

  const [onReply, setOnReply] = useState(false);

  useEffect(() => {
    setContent(comment.content);
    setIsLike(false);
    setOnReply(false);
    if (comment.likes.find((like) => like._id === auth.user._id)) {
      setIsLike(true);
    }
  }, [comment, auth.user._id]);

  const handleUpdate = () => {
    if (comment.content !== content) {
      updateComment({ comment, post, content, auth }, dispatch);
      setOnEdit(false);
    } else {
      setOnEdit(false);
    }
  };

  const handleLike = async () => {
    if (loadLike) return;
    setIsLike(true);

    setLoadLike(true);
    await likeComment({ comment, post, auth }, dispatch);
    setLoadLike(false);
  };

  const handleUnLike = async () => {
    if (loadLike) return;
    setIsLike(false);

    setLoadLike(true);
    await unLikeComment({ comment, post, auth }, dispatch);
    setLoadLike(false);
  };

  const handleReply = () => {
    if (onReply) return setOnReply(false);
    setOnReply({ ...comment, commentId });
  };

  const styleCard = {
    opacity: comment._id ? 1 : 0.5,
    pointerEvents: comment._id ? "inherit" : "none",
  };

  return (
    <div className="commentCard" style={styleCard}>
      <Link to={`/profile/${comment.user._id}`} className="link">
        <Avatar
          style={{
            filter: theme ? "invert(1)" : "invert(0)",
          }}
          src={comment.user.avatar}
          size="small"
        />
        <h6 className="textName">{comment.user.username}</h6>
      </Link>

      <div className="contentComment">
        <div
          className="leftContentComment"
          style={{
            filter: theme ? "invert(1)" : "invert(0)",
            color: theme ? "white" : "#111",
          }}
        >
          {onEdit ? (
            <textarea
              rows="5"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          ) : (
            <div>
              {comment.tag && comment.tag._id !== comment.user._id && (
                <Link to={`/profile/${comment.tag._id}`} className="link">
                  @{comment.tag.username}
                </Link>
              )}
              <span>
                {content.length < 100
                  ? content
                  : readMore
                  ? content + " "
                  : content.slice(0, 100) + "...."}
              </span>
              {content.length > 100 && (
                <span
                  className="readMore"
                  onClick={() => setReadMore(!readMore)}
                >
                  {readMore ? "Hide content" : "Read more"}
                </span>
              )}
            </div>
          )}

          <div className="commentInfo" style={{ cursor: "pointer" }}>
            <small className="commentMoment">
              {moment(comment.createdAt).fromNow()}
            </small>

            <small className="likesComment">{comment.likes.length} likes</small>

            {onEdit ? (
              <>
                <small className="updateComment" onClick={handleUpdate}>
                  update
                </small>
                <small
                  className="cancelUpdate"
                  onClick={() => setOnEdit(false)}
                >
                  cancel
                </small>
              </>
            ) : (
              <small className="replyCancel" onClick={handleReply}>
                {onReply ? "cancel" : "reply"}
              </small>
            )}
          </div>
        </div>

        <div className="rightContentComment" style={{ cursor: "pointer" }}>
          <CommentMenu post={post} comment={comment} setOnEdit={setOnEdit} />
          <LikeButton
            isLike={isLike}
            handleLike={handleLike}
            handleUnLike={handleUnLike}
          />
        </div>
      </div>

      {onReply && (
        <InputComment post={post} onReply={onReply} setOnReply={setOnReply}>
          <Link to={`/profile/${onReply.user._id}`} className="link">
            @{onReply.user.username}:
          </Link>
        </InputComment>
      )}

      {children}
    </div>
  );
};

export default CommentCard;
