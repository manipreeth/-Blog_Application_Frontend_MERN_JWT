import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

import UserImg from "../../Assets/Images/userPic.png";
import CommentImg from "../../Assets/Images/comment.png";
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";

// import contexts from App.js and singlePost
import { ParentContext } from "../../App";
import { commentParent } from "./SinglePost";

function Comments(props) {
  // import navbar state Parent context in App.js
  const navstate = useContext(ParentContext);
  const [navState, handleNavState] = navstate.nav;

  // import commentParent context in singlePost.js
  const commentProps = useContext(commentParent);

  // Get the comments array and its setter from context
  const [comments, handleComments] = commentProps.totalComments;

  // Get the comment input value and its setter from context
  const [comment, handleComment] = commentProps.commentInput;

  // Get the comment reload flag and its setter from context
  const [commentReload, handleCommentReload] = commentProps.reload;

  const [updateBtn, handleUpdateBtn] = commentProps.updateComment;
  const [updateID, hanldeUpdateID] = commentProps.updateID;

  const [loginUser, handleLoginUser] = useState("");

  // Fetch comments from server when the component mounts and whenever commentReload changes
  useEffect(() => {
    if (!navState) {
      axios
        .get(
          `https://blog-application-backend-5dvk.onrender.com/posts/viewPost/${props.postIdentity}`
        )
        .then((res) => {
          handleComments(res.data.data.comments);
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
      return;
    }

    // get token from localStorage
    const token = localStorage.getItem("Blogospheretoken");

    axios
      .get(
        `https://blog-application-backend-5dvk.onrender.com/posts/${props.postIdentity}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        handleComments(res.data.data.comments);
        handleLoginUser(res.data.userId);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  }, [commentReload]);

  const Edit = (value, index, id) => {
    alert("You can edit in comment posting space");
    comments.splice(index, 1);
    handleComment(value);
    handleUpdateBtn(!updateBtn);
    hanldeUpdateID([...updateID, id]);
    handleComments("");
  };

  const Delete = (index, id) => {
    // Send JSON Web Token which is stored in LocalStorage for Authorization
    const token = localStorage.getItem("Blogospheretoken");

    axios
      .delete(
        `https://blog-application-backend-5dvk.onrender.com/comments/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        comments.splice(index, 1);
        handleComments([...comments]);
        alert(res.data.data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  // Function to format the date
  const FormatDate = (string) => {
    let options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
  };

  return (
    <>
      {comments && (
        <div className=" commentSection p-2 ">
          <h5 className="mb-3">Comments :</h5>

          {comments.length > 0 ? (
            comments.map((value, index) => {
              return (
                <div className="individualCmnt p-2 py-3 my-2" key={value._id}>
                  <div className="d-flex justify-content-between mx-1 userDetails">
                    <div className="d-flex align-items-center">
                      {/* Render the user's profile image or a default image */}
                      <img
                        src={
                          value.user.profileImage
                            ? value.user.profileImage
                            : UserImg
                        }
                        className="homeUserImg"
                        alt="profileImg"
                      />
                      <p className="ms-2 fw-bold mb-0">{value.user.fullname}</p>
                    </div>
                    <small className="m-2">{FormatDate(value.updatedAt)}</small>
                  </div>
                  <p className="mt-1 ms-5 mb-0 comment">{value.message}</p>
                  {loginUser === value.user._id && (
                    <div className="commentsEdit justify-content-around justify-content-lg-end">
                      <FaPen
                        onClick={() => Edit(value.message, index, value._id)}
                        className="editIcon m-2 icon text-success"
                      />
                      <MdDelete
                        onClick={() => Delete(index, value._id)}
                        className="deleteIcon m-2 icon text-danger"
                      />
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            // If there are no comments, render a message
            <div className=" d-md-flex justify-content-center align-items-center container text-center individualCmnt p-2 py-3 my-2 ">
              <img
                src={CommentImg}
                alt="Be The First Person To Comment"
                width="200px"
              />
              <h4 className="tc-orange">Be The First Person To Comment</h4>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default React.memo(Comments);
