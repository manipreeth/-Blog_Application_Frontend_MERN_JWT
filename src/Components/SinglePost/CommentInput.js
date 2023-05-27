import React, { useState, useContext } from "react";
import axios from "axios";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import { ParentContext } from "../../App";
import { commentParent } from "./SinglePost";
import { useNavigate } from "react-router";

function CommentInput({ postIdentity }) {
  // Access the navigation state from ParentContext
  const context = useContext(ParentContext);
  const [navState, handleNavState] = context.nav;

  // Access comment input state and comment reload state from commentParent
  const commentProps = useContext(commentParent);
  const [comment, handleComment] = commentProps.commentInput;
  const [commentReload, handleCommentReload] = commentProps.reload;
  const [updateBtn, handleUpdateBtn] = commentProps.updateComment;
  const [updateID, hanldeUpdateID] = commentProps.updateID;

  // Check if user clicked the button
  const [btnClicked, setBtnClicked] = useState(false);

  const navigate = useNavigate();

  // Create a tooltip to display when user is not logged in
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Please Login to comment
    </Tooltip>
  );

  // Function to post a comment to the server
  const postComment = () => {
    setBtnClicked(true);

    // Send JSON Web Token which is stored in LocalStorage for Authorization
    const token = localStorage.getItem("token");

    if (comment.length > 0) {
      // if the comment is not empty
      return axios
        .post(
          `https://blog-application-backend-5dvk.onrender.com/comments/${postIdentity}`,
          {
            // post the comment to the backend
            message: comment,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setBtnClicked(false);
          handleComment(""); // clear the comment input field
          // trigger a state change in SinglePost component to reload the comments
          handleCommentReload(!commentReload);
          hanldeUpdateID([]);
        })

        .catch((err) => {
          setBtnClicked(false);
          alert(err.response.data.message);
        });
    } else {
      setBtnClicked(false);
      alert(" Enter your comment");
    }
  };

  const updateComment = (id) => {
    setBtnClicked(true);
    // Send JSON Web Token which is stored in LocalStorage for Authorization
    const token = localStorage.getItem("token");

    axios
      .put(
        `https://blog-application-backend-5dvk.onrender.com/comments/${id}`,
        {
          message: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setBtnClicked(false);
        handleCommentReload(!commentReload);
        handleUpdateBtn(!updateBtn);
        handleComment("");
      })
      .catch((err) => {
        setBtnClicked(false);
        alert(err.response.data.message);
      });
  };

  // Render the comment input field and post button
  return (
    <div className="my-3 commentsInput ">
      <input
        type="text"
        className="p-1 py-2 ps-2  my-3 commentArea "
        value={comment}
        onChange={(e) => handleComment(e.target.value)}
        placeholder="Leave a Comment"
      />

      {/* display the post button if the user is logged in, else display the tooltip */}
      {navState ? (
        <span>
          {updateBtn ? (
            <button
              className="mx-2  px-3 px-lg-3 btn btn-success"
              onClick={() => updateComment(updateID)}
              disabled={btnClicked}
            >
              {btnClicked ? "Updating Comment..." : "Update Comment"}
            </button>
          ) : (
            <button
              className=" mx-2  px-3 px-lg-3 btn btn-primary"
              onClick={postComment}
              disabled={btnClicked}
            >
              {btnClicked ? "Commenting..." : "Comment"}
            </button>
          )}
        </span>
      ) : (
        // Otherwise, render a post button that sends the comment to the server
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          overlay={renderTooltip}
        >
          <button className="mx-2  px-3 px-lg-5 btn btn-primary">Post</button>
        </OverlayTrigger>
      )}
    </div>
  );
}

export default CommentInput;
