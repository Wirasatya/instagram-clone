import React, { useContext } from "react";
import { Avatar } from "@material-ui/core";
import { MoreVert, Edit, DeleteOutline, InsertLink } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import moment from "moment";
import { GLOBALTYPES } from "../../context/globalTypes";
import { StateContext } from "../../context/StateProvider";
import { deletePost } from "../../context/actions/postAction";
import { BASE_URL } from "../../utils/config";
import "./cardHeader.scss";

const CardHeader = ({ post }) => {
  const [{ auth, socket, theme }, dispatch] = useContext(StateContext);

  const history = useHistory();

  const handleEditPost = () => {
    dispatch({ type: GLOBALTYPES.STATUS, payload: { ...post, onEdit: true } });
  };

  const handleDeletePost = () => {
    if (window.confirm("Are you sure want to delete this post?")) {
      deletePost({ post, auth, socket }, dispatch);
      return history.push("/");
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${BASE_URL}/post/${post._id}`);
  };

  return (
    <div className="cardHeader">
      <div className="leftHeader">
        <Avatar
          src={post.user.avatar}
          style={{ filter: theme ? "invert(1)" : "invert(0)" }}
          size="medium"
        />

        <div className="InfoWrapp">
          <h6 className="textName">
            <Link to={`/profile/${post.user._id}`} className="link">
              {post.user.username}
            </Link>
          </h6>
          <small className="timeMoment">
            {moment(post.createdAt).fromNow()}
          </small>
        </div>
      </div>

      <div className="rightHeader">
        <MoreVert className="iconMoreVert"></MoreVert>

        <div className="dropdownMoreVert">
          {auth.user._id === post.user._id && (
            <>
              <div className="itemDropdown" onClick={handleEditPost}>
                <Edit className="iconDropdown"></Edit> Edit Post
              </div>
              <div className="itemDropdown" onClick={handleDeletePost}>
                <DeleteOutline className="iconDropdown"></DeleteOutline> Remove
                Post
              </div>
            </>
          )}

          <div className="itemDropdown" onClick={handleCopyLink}>
            <InsertLink className="iconDropdown"></InsertLink> Copy Link
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardHeader;
