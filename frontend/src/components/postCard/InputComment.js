import React, { useContext, useState } from "react";
import { createComment } from "../../context/actions/commentAction";
import { StateContext } from "../../context/StateProvider";
import Icons from "../icons/Icons";
import "./inputComment.scss";

const InputComment = ({ children, post, onReply, setOnReply }) => {
  const [content, setContent] = useState("");

  const [{ auth, socket, theme }, dispatch] = useContext(StateContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) {
      if (setOnReply) return setOnReply(false);
      return;
    }

    setContent("");

    const newComment = {
      content,
      likes: [],
      user: auth.user,
      createdAt: new Date().toISOString(),
      reply: onReply && onReply.commentId,
      tag: onReply && onReply.user,
    };
    createComment({ post, newComment, auth, socket }, dispatch);

    if (setOnReply) return setOnReply(false);
  };

  return (
    <form className="inputComment" onSubmit={handleSubmit}>
      {children}
      <input
        className="newComment"
        type="text"
        placeholder="Add your comments..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{
          filter: theme ? "invert(1)" : "invert(0)",
          color: theme ? "white" : "#111",
          background: theme ? "rgba(0,0,0,.03)" : "",
        }}
      />

      <Icons setContent={setContent} content={content} theme={theme} />

      <button type="submit" className="postBtn">
        Post
      </button>
    </form>
  );
};

export default InputComment;
