import "./posts.scss";
import React, { useContext, useState } from "react";
import PostCard from "../postCard/PostCard";

import LoadIcon from "../../images/loading.gif";
import LoadMoreBtn from "../loadMoreBtn/LoadMoreBtn";
import { getDataAPI } from "../../utils/fetchData";
import { StateContext } from "../../context/StateProvider";
import { POST_TYPES } from "../../context/actions/postAction";

const Posts = () => {
  const [{ post, auth, theme }, dispatch] = useContext(StateContext);

  const [load, setLoad] = useState(false);

  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(`posts?limit=${post.page * 9}`, auth.token);

    dispatch({
      type: POST_TYPES.GET_POSTS,
      payload: { ...res.data, page: post.page + 1 },
    });

    setLoad(false);
  };

  return (
    <div className="posts">
      {post.posts.map((post) => (
        <PostCard key={post._id} post={post} theme={theme} />
      ))}

      {load && <img src={LoadIcon} alt="loading" className="d-block mx-auto" />}

      <LoadMoreBtn
        result={post.result}
        page={post.page}
        load={load}
        handleLoadMore={handleLoadMore}
      />
    </div>
  );
};

export default Posts;
