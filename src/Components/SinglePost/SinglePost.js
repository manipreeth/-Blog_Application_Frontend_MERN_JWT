import React, { useState, useEffect, useContext } from "react";
import "./singlePost.css";
import axios from "axios";

import LoadingImg from "../../Assets/Images/loading.png";

import Comments from "./Comments";
import CommentInput from "./CommentInput";
import PostActions from "./PostActions";

// Import useLocation hook from react-router to get the postId from the URL
import { useLocation, useNavigate } from "react-router";

// Import parse from html-react-parser to parse HTML strings as React components
import parse from "html-react-parser";

// import context from App.js
import { ParentContext } from "../../App";

// Import lottie dependency and loading animation
import Lottie from "lottie-react";
import LodingAnimation from "../../Assets/LottieAnimations/loading.json";

// Create a context for sharing state between child components
export const commentParent = React.createContext();
export const postActions = React.createContext();

function SinglePost() {
  // import navbar state Parent context in App.js
  const navstate = useContext(ParentContext);
  const [navState, handleNavState] = navstate.nav;

  const navigate = useNavigate();

  const search = useLocation().search; // Get the search string from the URL
  const postId = new URLSearchParams(search).get("postid"); // Get the postId from the search string

  const [comments, handleComments] = useState(""); // Create a state variable for storing the comments related to the post
  const [comment, handleComment] = useState(""); // Create a state variable for storing the user's new comment

  // Create a state variable to force the comment section to reload after a new comment is added
  const [commentReload, handleCommentReload] = useState(true);

  const [updateBtn, handleUpdateBtn] = useState(false);
  const [updateID, hanldeUpdateID] = useState([]);

  // Initialize state for post details
  const [postDetails, handlePostDetails] = useState("");

  const [alreadyLiked, setAlreadyLiked] = useState(true);
  const [userid, setUserid] = useState("");
  const [likeCount, setLikeCount] = useState("");

  // Fetch the post details using the post ID parameter from the URL
  useEffect(() => {
    if (!navState) {
      // if user not login then make request to viewPost/:id route and return res
      axios
        .get(
          `https://blog-application-backend-5dvk.onrender.com/posts/viewPost/${postId}`
        )
        .then((res) => {
          // Update the postDetails state variable with the data received from the server
          handlePostDetails(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
      return;
    }

    // get token from localStorage
    const token = localStorage.getItem("Blogospheretoken");

    // Set the post ID to the post ID in the URL
    axios
      .get(
        `https://blog-application-backend-5dvk.onrender.com/posts/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        // Update the postDetails state variable with the data received from the server
        handlePostDetails(res.data.data);
        setUserid(res.data.userId);
      })
      .catch((err) => alert(err.response.data.message));
  }, []);

  // Declaring second useEffect to track likes of the post
  useEffect(() => {
    if (userid) {
      likesDetails(userid);
    }
  }, [userid, postDetails]);

  // Function to check likes of post
  const likesDetails = (user) => {
    if (user && postDetails) {
      // check if likes array length is greater than 0
      if (postDetails.likes.length > 0) {
        setLikeCount(postDetails.likes.length);
        // if post already liked by user
        if (postDetails.likes.includes(user)) {
          setAlreadyLiked(true);
        } else {
          setAlreadyLiked(false);
        }
      } else {
        setAlreadyLiked(false);
        setLikeCount(0);
      }
    } else {
      setLikeCount(0);
      setAlreadyLiked(false);
    }
  };

  return (
    <>
      {postDetails ? (
        <div className="singlePost py-3 container">
          {/* Post Title */}
          <h1 className="mb-4 ms-3">{postDetails.title}</h1>

          {/* Post Action Buttons Component */}
          <postActions.Provider
            value={{
              details: [postDetails, handlePostDetails],
              likeStatus: [alreadyLiked, setAlreadyLiked],
              likesCount: [likeCount, setLikeCount],
            }}
          >
            <PostActions postId={postId} />
          </postActions.Provider>

          {/* Post Image */}
          <div className="postImgDiv mb-4  ">
            <img
              src={postDetails.image ? postDetails.image : LoadingImg}
              className="postImg p-2 p-md-2"
              alt="Post Image"
            />
          </div>

          {/* Render the post description using the parse function from html-react-parser */}
          <div>{parse(`${postDetails.description}`)}</div>

          {/* Provide the comment state and functions to child components using the context */}
          <commentParent.Provider
            value={{
              totalComments: [comments, handleComments], // Pass down the comments state variable and its update function
              commentInput: [comment, handleComment], // Pass down the user's new comment and its update function
              reload: [commentReload, handleCommentReload], // Pass down the commentReload state variable and its update function
              updateComment: [updateBtn, handleUpdateBtn],
              updateID: [updateID, hanldeUpdateID],
            }}
          >
            {/* Render the comment input component */}
            {navState && <CommentInput postIdentity={postId} />}

            {/* Render the comments component */}
            <Comments postIdentity={postId} />
          </commentParent.Provider>
        </div>
      ) : (
        <div className="d-flex  flex-column align-items-center">
          <Lottie
            animationData={LodingAnimation}
            className="loadingAnimation"
          />
          <h1 className=" mt-1 ">Loading...</h1>
        </div>
      )}
    </>
  );
}

export default SinglePost;
