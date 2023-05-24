import React, { useState, useEffect } from "react";
import "./singlePost.css";
import axios from "axios";

import LoadingImg from "../../Assets/Images/loading.png";

import Comments from "./Comments";
import CommentInput from "./CommentInput";

// Import useLocation hook from react-router to get the postId from the URL
import { useLocation } from "react-router";

// Import parse from html-react-parser to parse HTML strings as React components
import parse from "html-react-parser";

// Create a context for sharing state between child components
export const commentParent = React.createContext();

function SinglePost() {
  const search = useLocation().search; // Get the search string from the URL
  const postId = new URLSearchParams(search).get("postid"); // Get the postId from the search string

  const [comments, handleComments] = useState(""); // Create a state variable for storing the comments related to the post
  const [comment, handleComment] = useState(""); // Create a state variable for storing the user's new comment

  // Create a state variable to force the comment section to reload after a new comment is added
  const [commentReload, handleCommentReload] = useState(true);

  // Initialize state for post details
  const [postDetails, handlePostDetails] = useState("");

  // Fetch the post details using the post ID parameter from the URL
  useEffect(() => {
    axios
      .get(`/posts/${postId}`)
      .then((res) => {
        // Update the postDetails state variable with the data received from the server
        handlePostDetails(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="singlePost py-3 container">
      <h1 className="mb-4 ms-3">{postDetails.title}</h1>
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
          abc: [commentReload, handleCommentReload], // Pass down the commentReload state variable and its update function
        }}
      >
        {/* Render the comment input component */}
        <CommentInput postIdentity={postId} />

        {/* Render the comments component */}
        <Comments postIdentity={postId} />
      </commentParent.Provider>
    </div>
  );
}

export default SinglePost;
