import React, { useContext, useEffect } from "react";
import axios from "axios";

import UserImg from "../../images/userPic.png";
import CommentImg from "../../images/comment.png";
import { commentParent } from "./SinglePost";

function Comments(props) {
  const commentProps = useContext(commentParent);

  // Get the comments array and its setter from context
  const [comments, handleComments] = commentProps.totalComments;

  // Get the comment input value and its setter from context
  const [comment, handleComment] = commentProps.commentInput;

  // Get the comment reload flag and its setter from context
  const [commentReload, handleCommentReload] = commentProps.abc;

  // Fetch comments from server when the component mounts and whenever commentReload changes
  useEffect(() => {
    axios
      .get(`/posts/${props.postIdentity}`)
      .then((res) => {
        handleComments(res.data.data.comments);
      })
      .catch((err) => console.log(err));
  }, [commentReload]);

  // Function to format the date
  const FormatDate = (string) => {
    let options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
  };

  return (
    <>
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
                  <small className="m-2">{FormatDate(value.createdAt)}</small>
                </div>
                <p className="mt-1 ms-5 mb-0 comment">{value.message}</p>
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
    </>
  );
}

export default React.memo(Comments);
