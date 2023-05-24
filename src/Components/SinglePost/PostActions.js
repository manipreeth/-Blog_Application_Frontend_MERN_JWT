import React, { useContext } from "react";
import axios from "axios";

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

  console.log("alreadyLiked-top", alreadyLiked);

  // Function to copy link to clipboard
  const copyToClipboard = (link) => {
    navigator.clipboard.writeText(link);
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
  const likePost = async (id) => {
    // Send JSON Web Token which is stored in LocalStorage for Authorization
    const token = localStorage.getItem("token");

    await axios
      .post(`/posts/like/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("----like---", res.data);
        // setLiked(!liked);
        handlePostDetails(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  // function to unlike the post
  const unlikePost = async (id) => {
    // Send JSON Web Token which is stored in LocalStorage for Authorization
    const token = localStorage.getItem("token");

    await axios
      .post(`/posts/unlike/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("----Unlike----", res.data);
        // setLiked(!liked);
        handlePostDetails(res.data.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="d-flex align-items-center">
      {/* Share Post URL Button */}
      <OverlayTrigger
        placement="right"
        delay={{ show: 250, hide: 400 }}
        overlay={shareURLTooltip}
      >
        <span
          className="px-3 py-1 actionBtns"
          onClick={() =>
            copyToClipboard(`http://localhost:3000/singlePost?postid=${postId}`)
          }
        >
          Share URL &nbsp;
          <FiShare2 />
        </span>
      </OverlayTrigger>

      {/* Display Like and Unlike Button only when user Login */}
      {navState && (
        <>
          {alreadyLiked ? (
            <>
              {/* Unlike Post Button */}
              {console.log("Inside---Unlike--", alreadyLiked)}
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
              {console.log("Inside---Like--", alreadyLiked)}
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
