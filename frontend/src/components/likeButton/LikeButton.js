import { Favorite, FavoriteBorder } from "@material-ui/icons";
import React, { useContext } from "react";
import { StateContext } from "../../context/StateProvider";
import "./likeButton.scss";

const LikeButton = ({ isLike, handleLike, handleUnLike }) => {
  const [{ theme }] = useContext(StateContext);

  return (
    <>
      {isLike ? (
        <Favorite
          onClick={handleUnLike}
          style={{
            filter: theme ? "invert(1)" : "invert(0)",
            color: "crimson",
            fontSize: "40px",
            marginLeft: "20px",
            cursor: "pointer",
          }}
        ></Favorite>
      ) : (
        <FavoriteBorder
          onClick={handleLike}
          style={{
            fontSize: "40px",
            marginLeft: "20px",
            cursor: "pointer",
          }}
        ></FavoriteBorder>
      )}
    </>
  );
};

export default LikeButton;
