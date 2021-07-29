import React from "react";
import "./loadMoreBtn.scss";

const LoadMoreBtn = ({ result, page, load, handleLoadMore }) => {
  return (
    <>
      {result < 9 * (page - 1)
        ? ""
        : !load && (
            <button className="buttonLoadMore" onClick={handleLoadMore}>
              Load more
            </button>
          )}
    </>
  );
};

export default LoadMoreBtn;
