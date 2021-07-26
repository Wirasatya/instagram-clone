import React, { useContext, useEffect } from "react";
import { StateContext } from "../../context/StateProvider";

import Status from "../../components/home/Status";
import Posts from "../../components/home/Posts";
import RightSideBar from "../../components/home/RightSidebar";

import LoadIcon from "../../images/loading.gif";
import "./home.scss";

let scroll = 0;

const Home = () => {
  const [{ post }] = useContext(StateContext);

  window.addEventListener("scroll", () => {
    if (window.location.pathname === "/") {
      scroll = window.pageYOffset;
      return scroll;
    }
  });

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: scroll, behavior: "smooth" });
    }, 100);
  }, []);

  return (
    <div className="home">
      <div className="containerHome">
        <img src={LoadIcon} alt="loading" className="loadingPost" />
        <Status />

        {post.loading ? (
          <img src={LoadIcon} alt="loading" className="loadingPost" />
        ) : post.result === 0 && post.posts.length === 0 ? (
          <h2 className="noPost">No Post</h2>
        ) : (
          <Posts />
        )}
      </div>

      <div className="sidebarRight">
        <RightSideBar />
      </div>
    </div>
  );
};

export default Home;
