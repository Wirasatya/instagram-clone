import React, { useState, useEffect, useContext } from "react";
import {
  getDiscoverPosts,
  DISCOVER_TYPES,
} from "../../context/actions/discoverAction";
import { StateContext } from "../../context/StateProvider";
import LoadIcon from "../../images/loading.gif";
import PostThumb from "../../components/postThumb/PostThumb";
import LoadMoreBtn from "../../components/loadMoreBtn/LoadMoreBtn";
import { getDataAPI } from "../../utils/fetchData";
import "./discover.scss";

const Discover = () => {
  const [{ auth, discover }, dispatch] = useContext(StateContext);

  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (!discover.firstLoad) {
      getDiscoverPosts(auth.token, dispatch);
    }
  }, [dispatch, auth.token, discover.firstLoad]);

  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(
      `post_discover?num=${discover.page * 9}`,
      auth.token
    );
    dispatch({ type: DISCOVER_TYPES.UPDATE_POST, payload: res.data });
    setLoad(false);
  };

  return (
    <div className="discover">
      {discover.loading ? (
        <img src={LoadIcon} alt="loading" className="loadingIcon" />
      ) : (
        <PostThumb posts={discover.posts} result={discover.result} />
      )}

      {load && <img src={LoadIcon} alt="loading" className="loadingIcon" />}

      {!discover.loading && (
        <LoadMoreBtn
          result={discover.result}
          page={discover.page}
          load={load}
          handleLoadMore={handleLoadMore}
        />
      )}
    </div>
  );
};

export default Discover;
