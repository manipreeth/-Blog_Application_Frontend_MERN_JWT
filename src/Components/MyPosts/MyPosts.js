import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import "./MyPosts.css";

// Images
import TestImg from "../../Assets/Images/test.png";
import NoPosts from "../../Assets/Images/noPosts.png";

// Context
import { ParentContext } from "../../App";

// other imports
import { useNavigate } from "react-router";
import { FiExternalLink } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import parse from "html-react-parser";

function MyPosts() {
  // Using the useContext hook to access the `nav` state from the `ParentContext`
  const props = useContext(ParentContext);
  const [navState, handleNavState] = props.nav;

  // Using the useState hook to set the state for `MyPost`, `postDeleted`
  const [MyPost, handleMypost] = useState();
  const [postDeleted, handlePostDel] = useState(false);

  // Send JSON Web Token which is stored in LocalStorage for Authorization
  const token = localStorage.getItem("token");

  // Using the useEffect hook to fetch the data from the backend API and update the state of `MyPost` when `postDeleted` is changed
  useEffect(() => {
    axios
      .get("/users/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.data.length !== 0) {
          handleMypost(res.data.data);
        }
      })
      .catch((err) => console.log(err.response.data.message));
  }, [postDeleted]);

  // Using the useNavigate hook to navigate to a different route when clicked
  const navigate = useNavigate();

  // Function to delete the post with the given id from the backend API and update the state of `postDeleted` accordingly
  const deletePost = (id) => {
    axios
      .delete(`posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        handlePostDel(!postDeleted);
        alert(res.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="d-flex flex-wrap container routeLayout ">
      {MyPost ? (
        MyPost.map((value, index) => {
          return (
            <div className="myposts" key={value._id}>
              <div className="d-flex flex-wrap justify-content-between align-content-center">
                <h1 className="postHeading">{value.title} </h1>
                <button
                  className="btn p-0 fw-bolder text-danger"
                  title="Delete"
                  onClick={() => deletePost(value._id)}
                >
                  <MdDelete size="20px" />
                </button>
              </div>

              {/* Displaying the post image */}
              <img src={value.image ? value.image : TestImg} alt="post pic" />

              {/* Displaying the post description using `parse` function to convert HTML string to React components */}
              <div className="mypostDes">{parse(`${value.description}`)}</div>

              {/* Displaying a link to view the full post */}
              {/* CSS of classname readmore declared in home.css */}
              <a
                className="d-block text-decoration-none readmore"
                onClick={() => navigate(`/singlePost?postid=${value._id}`)}
              >
                Read more
                <FiExternalLink />
              </a>
            </div>
          );
        })
      ) : (
        // If there are no posts, display a message with an image and a button to create a new post if the user is logged in, or to login if not
        <div className="noPosts pb-5">
          <img src={NoPosts} className="noPostsIcon" />
          <h3>No Posts Found !</h3>
          {navState ? (
            <button
              onClick={() => navigate("/createPost")}
              className="btn btn-success"
            >
              Make your First Post
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="btn btn-success"
            >
              Login to post
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default MyPosts;
