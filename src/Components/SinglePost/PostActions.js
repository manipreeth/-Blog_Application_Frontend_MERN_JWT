import React, { useContext } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

// Import Contexts
import { ParentContext } from "../../App";
import { postActions } from "./SinglePost";

// import Icons
import { FiShare2 } from "react-icons/fi";
import { IoIosHeartEmpty } from "react-icons/io";
import { AiFillHeart } from "react-icons/ai";

// import components from react-bootstrap
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

function PostActions(props) {
  // destructering props
  const { postId } = props;

  // import navbar state Parent context in App.js
  const navstate = useContext(ParentContext);
  const [navState, handleNavState] = navstate.nav;

  // import postActions Context from SinglePost.js
  const Details = useContext(postActions);
  const [postDetails, handlePostDetails] = Details.details;
  const [alreadyLiked, setAlreadyLiked] = Details.likeStatus;
  const [likeCount, setLikeCount] = Details.likesCount;

  // Get Current URL
  const location = useLocation();
  const currentURL = `${window.location.origin}${location.pathname}${location.search}`;

  // Function to copy the URL to clipboard
  const copyToClipboard = () => {
    if (navigator.clipboard) {
      // For desktop devices
      navigator.clipboard
        .writeText(currentURL)
        .then(() => {
          alert("URL Copied!");
        })
        .catch((error) => {
          console.error("Failed to copy URL:", error);
        });
    } else {
      // For mobile devices
      const textArea = document.createElement("textarea");
      textArea.value = currentURL;
      textArea.style.position = "fixed";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        const successful = document.execCommand("copy");
        const message = successful ? "URL Copied!" : "Copying URL failed";
        alert(message);
      } catch (error) {
        console.error("Failed to copy URL:", error);
      }
      document.body.removeChild(textArea);
    }
  };

  // Share URl button tooltip
  const shareURLTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Copy URL to clipboard
    </Tooltip>
  );

  // Like Post button tooltip
  const likePostTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Like Post
    </Tooltip>
  );

  // Unlike Post button tooltip
  const unlikePostTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Unlike Post
    </Tooltip>
  );

  // function to like the post
  const likePost = (id) => {
    // Send JSON Web Token which is stored in LocalStorage for Authorization
    const token = localStorage.getItem("Blogospheretoken");

    axios
      .post(
        `https://blog-application-backend-5dvk.onrender.com/posts/like/${id}`,
        { id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        handlePostDetails(res.data.data);
      })
      .catch((err) => alert(err.response.data.message));
  };

  // function to unlike the post
  const unlikePost = (id) => {
    // Send JSON Web Token which is stored in LocalStorage for Authorization
    const token = localStorage.getItem("Blogospheretoken");

    axios
      .post(
        `https://blog-application-backend-5dvk.onrender.com/posts/unlike/${id}`,
        { id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        handlePostDetails(res.data.data);
      })
      .catch((err) => alert(err.response.data.message));
  };
  return (
    <div className="d-flex align-items-center">
      {/* Share Post URL Button */}
      <OverlayTrigger
        placement="right"
        delay={{ show: 250, hide: 200 }}
        overlay={shareURLTooltip}
      >
        <button
          className="px-3 py-1 actionBtns"
          onClick={() => copyToClipboard(currentURL)}
        >
          Share URL &nbsp;
          <FiShare2 />
        </button>
      </OverlayTrigger>

      {/* Display Like and Unlike Button only when user Login */}
      {navState && (
        <>
          {alreadyLiked ? (
            <>
              {/* Unlike Post Button */}
              <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={unlikePostTooltip}
              >
                <span
                  className="ps-3 py-1 mb-2 actionBtns position-relative unlikeBtn"
                  onClick={() => unlikePost(postId)}
                >
                  <small className="position-absolute top-50 start-50 translate-middle z-3 text-white ps-3 likecount">
                    {likeCount}
                  </small>
                  <AiFillHeart size={35} />
                </span>
              </OverlayTrigger>
            </>
          ) : (
            <>
              {/* Like Post Button */}
              <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={likePostTooltip}
              >
                <span
                  className="ps-3 py-1 mb-2 actionBtns position-relative likeBtn"
                  onClick={() => likePost(postId)}
                >
                  <small className="position-absolute top-50 start-50 translate-middle z-3 text-black likecount ps-3">
                    {likeCount}
                  </small>
                  <IoIosHeartEmpty size={35} />
                </span>
              </OverlayTrigger>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default PostActions;
