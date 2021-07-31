import React, { useState, useEffect } from "react";
import CommentCard from "./CommentCard";
import "./commentDisplay.scss";

const CommentDisplay = ({ comment, post, replyCm }) => {
  const [showRep, setShowRep] = useState([]);
  const [next, setNext] = useState(1);

  useEffect(() => {
    setShowRep(replyCm.slice(replyCm.length - next));
  }, [replyCm, next]);

  return (
    <div className="commentDisplay">
      <CommentCard comment={comment} post={post} commentId={comment._id}>
        <div className="commentWrapper">
          {showRep.map(
            (item, index) =>
              item.reply && (
                <CommentCard
                  key={index}
                  comment={item}
                  post={post}
                  commentId={comment._id}
                />
              )
          )}

          {replyCm.length - next > 0 ? (
            <div
              style={{ cursor: "pointer", color: "crimson" }}
              onClick={() => setNext(next + 10)}
            >
              See more comments...
            </div>
          ) : (
            replyCm.length > 1 && (
              <div
                style={{ cursor: "pointer", color: "crimson" }}
                onClick={() => setNext(1)}
              >
                Hide comments...
              </div>
            )
          )}
        </div>
      </CommentCard>
    </div>
  );
};

export default CommentDisplay;
