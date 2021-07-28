import React from "react";
import CardHeader from "./CardHeader";
import CardBody from "./CardBody";
import CardFooter from "./CardFooter";
import Comments from "./Comments";
import InputComment from "./InputComment";
import "./postCard.scss";

const PostCard = ({ post, theme }) => {
  return (
    <div className="postCard">
      <CardHeader post={post} />
      <CardBody post={post} theme={theme} />
      <CardFooter post={post} />
      <Comments post={post} />
      <InputComment post={post} />
    </div>
  );
};

export default PostCard;
