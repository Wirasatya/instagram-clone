import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "../../context/actions/postAction";
import LoadIcon from "../../images/loading.gif";
import PostCard from "../../components/postCard/PostCard";
import { StateContext } from "../../context/StateProvider";
import "./post.scss";

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState([]);

  const [{ auth, detailPost }, dispatch] = useContext(StateContext);

  useEffect(() => {
    getPost({ detailPost, id, auth }, dispatch);

    if (detailPost.length > 0) {
      const newArr = detailPost.filter((post) => post._id === id);
      setPost(newArr);
    }
  }, [detailPost, dispatch, id, auth]);

  return (
    <div className="post">
      {post.length === 0 && (
        <img src={LoadIcon} alt="loading" className="loadingIcon" />
      )}

      {post.map((item) => (
        <PostCard key={item._id} post={item} />
      ))}
    </div>
  );
};

export default Post;
