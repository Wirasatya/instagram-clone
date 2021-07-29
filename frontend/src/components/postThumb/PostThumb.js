import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { StateContext } from "../../context/StateProvider";
import { FavoriteBorder, ForumOutlined } from "@material-ui/icons";
import "./postThumb.scss";
const PostThumb = ({ posts, result }) => {
  const [{ theme }] = useContext(StateContext);

  if (result === 0) return <h2 className="text-center text-danger">No Post</h2>;

  return (
    <div className="postThumb">
      {posts.map((post) => (
        <Link className="link" key={post._id} to={`/post/${post._id}`}>
          <div className="displayPostThumb">
            {post.images[0].url.match(/video/i) ? (
              <video
                controls
                src={post.images[0].url}
                alt={post.images[0].url}
                style={{ filter: theme ? "invert(1)" : "invert(0)" }}
              />
            ) : (
              <img
                src={post.images[0].url}
                alt={post.images[0].url}
                style={{ filter: theme ? "invert(1)" : "invert(0)" }}
              />
            )}

            <div className="menuWrapper">
              <span className="likeCount">
                <FavoriteBorder className="iconThumb"></FavoriteBorder>{" "}
                {post.likes.length}
              </span>
              <span className="likeCount">
                <ForumOutlined className="iconThumb"></ForumOutlined>{" "}
                {post.comments.length}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PostThumb;
