import { DeleteOutline, Edit, MoreVert } from "@material-ui/icons";
import React, { useContext } from "react";
import { deleteComment } from "../../context/actions/commentAction";
import { StateContext } from "../../context/StateProvider";
import "./commentMenu.scss";

const CommentMenu = ({ post, comment, setOnEdit }) => {
  const [{ auth, socket }, dispatch] = useContext(StateContext);

  const handleRemove = () => {
    if (post.user._id === auth.user._id || comment.user._id === auth.user._id) {
      deleteComment({ post, auth, comment, socket }, dispatch);
    }
  };

  const MenuItem = () => {
    return (
      <>
        <div className="dropdoownItem" onClick={() => setOnEdit(true)}>
          <Edit className="iconDropdown"></Edit> Edit
        </div>
        <div className="dropdoownItem" onClick={handleRemove}>
          <DeleteOutline className="iconDropdown"></DeleteOutline> Delete
        </div>
      </>
    );
  };

  return (
    <div className="menuComment">
      {(post.user._id === auth.user._id ||
        comment.user._id === auth.user._id) && (
        <>
          <MoreVert className="iconMoreVert"></MoreVert>

          <div className="dropdownContent" aria-labelledby="moreLink">
            {post.user._id === auth.user._id ? (
              comment.user._id === auth.user._id ? (
                MenuItem()
              ) : (
                <div className="dropdoownItem" onClick={handleRemove}>
                  <DeleteOutline className="iconDropdown"></DeleteOutline>{" "}
                  Delete
                </div>
              )
            ) : (
              comment.user._id === auth.user._id && MenuItem()
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CommentMenu;
