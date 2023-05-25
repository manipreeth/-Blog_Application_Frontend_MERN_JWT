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
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import parse from "html-react-parser";

// import components for tooltip from react-bootstrap
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

// Import Lottie animation dependency
import Lottie from "lottie-react";
import LodingAnimation from "../../Assets/LottieAnimations/loading.json";

function MyPosts() {
  // Using the useContext hook to access the `nav` state from the `ParentContext`
  const props = useContext(ParentContext);
  const [navState, handleNavState] = props.nav;

  // Using the useState hook to set the state for `MyPost`, `postDeleted`
  const [MyPost, handleMypost] = useState();
  const [postDeleted, handlePostDel] = useState(false);

  // handle display of loading animation
  const [isLoading, setLoading] = useState(true);

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
        setLoading(false);
        handleMypost(res.data.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.response.data.message);
      });
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

  // Edit tooltip
  const editTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Edit
    </Tooltip>
  );

  // Delete tooltip
  const deleteTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Delete
    </Tooltip>
  );

  if (isLoading) {
    return (
      <div className="d-flex flex-column flex-wrap align-items-center container">
        <Lottie animationData={LodingAnimation} className="loadingAnimation" />
        <h1 className=" mt-1 ">Loading...</h1>
      </div>
    );
  }
  return (
    <div className="d-flex flex-wrap container routeLayout justify-content-md-between justify-content-xl-start">
      {MyPost.length > 0 ? (
        MyPost.map((value, index) => {
          return (
            <div className="myposts" key={value._id}>
              <div className="d-flex flex-wrap justify-content-between align-content-center">
                <h1 className="postHeading postTitleSize" title={value.title}>
                  {value.title}
                </h1>

                <div>
                  <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    overlay={editTooltip}
                  >
                    <button
                      className="btn p-0 me-1 fw-bolder text-secondary"
                      onClick={() => navigate(`/editPost?postid=${value._id}`)}
                    >
                      <FaPen size="18px" />
                    </button>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    overlay={deleteTooltip}
                  >
                    <button
                      className="btn p-0 fw-bolder text-danger"
                      onClick={() => deletePost(value._id)}
                    >
                      <MdDelete size="20px" />
                    </button>
                  </OverlayTrigger>
                </div>
              </div>

              {/* Displaying the post image */}
              <div className="mypostImg">
                <img src={value.image ? value.image : TestImg} alt="post pic" />
              </div>

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
        <div className="noPosts pb-5">
          <img src={NoPosts} className="noPostsIcon" />
          <h3>No Posts Found !</h3>

          {/* If the user login and no posts are created by user then button with label "Make your first post" is displayed;
                if user login is false then "Login to post" label button is displayed */}
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
