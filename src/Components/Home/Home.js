import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./home.css";

import { FiExternalLink } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import parse from "html-react-parser";

import BannerHeading from "./BannerHeading";
import UserImg from "../../Assets/Images/userPic.png";

// Import context
import { ParentContext } from "../../App";

// Import lottie animations and dependency
import Lottie from "lottie-react";
import LodingAnimation from "../../Assets/LottieAnimations/loading.json";
import Blog from "../../Assets/LottieAnimations/bloggingMale.json";

function Home() {
  // Set up state to store post data retrieved from API
  const [post, handlePost] = useState("");

  // import context from App.js
  const props = useContext(ParentContext);
  const [navState, handleNavState] = props.nav;

  // React Router's navigation hook
  const navigate = useNavigate();

  // Fetches post data from the backend API upon component mount when navState is true.
  useEffect(() => {
    if (navState) {
      // Send JSON Web Token which is stored in LocalStorage for Authorization
      const token = localStorage.getItem("token");
      axios
        .get("https://blog-application-backend-5dvk.onrender.com/posts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const details = res.data.data;
          handlePost(details);
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    }
  }, [navState]);

  // Render the component with the post data received from the API
  return (
    <>
      {!navState && (
        <div className="d-flex flex-md-nowrap flex-wrap justify-content-around align-items-center">
          <div className="ms-2 d-none d-md-inline">
            <BannerHeading />
          </div>
          <Lottie animationData={Blog} className="homeAnimationLogo" />
          <div className="ms-2 mt-3 d-md-none">
            <BannerHeading />
          </div>
        </div>
      )}
      {/* List Of Posts */}
      {navState && (
        <div className="home  p-2 p-sm-3 container">
          {/* Checks if there are any posts */}
          {post.length > 0 ? (
            // If post data is available, map through each post item and render a post component for each one
            // Loops through the posts and renders a UI for each post
            post.map((item) => {
              return (
                <div className="homePosts  " key={item._id}>
                  <div className=" mx-1 d-none d-md-block ">
                    <p className="d-flex align-items-center">
                      <img
                        src={
                          item.user.profileImage
                            ? item.user.profileImage
                            : UserImg
                        }
                        className="homeUserImg "
                        alt="User Profile pic"
                      />
                      &nbsp;
                      <span className="ms-1 fw-bold">{item.user.fullname}</span>
                    </p>
                  </div>

                  <div className="d-md-flex  justify-content-lg-between">
                    <div className="me-lg-5 mt-1 homeImgContainer">
                      <div className=" mx-1 d-md-none">
                        <p className="d-flex align-items-center">
                          <img
                            src={
                              item.user.profileImage
                                ? item.user.profileImage
                                : UserImg
                            }
                            className="homeUserImg "
                            alt="User Profile pic"
                          />
                          &nbsp;
                          <span className="ms-1 fw-bold">
                            {item.user.fullname}
                          </span>
                        </p>
                      </div>

                      {/* Renders the post image */}
                      <img
                        src={item.image}
                        className="homePostImg "
                        alt="Post Image"
                      />
                    </div>
                    <div className=" ms-md-2 homepostDetails ">
                      <h1 className=" postHeading ">{item.title}</h1>
                      <div className="p-1 homePostD">
                        {/* Renders the post description */}
                        <p className="homePostdesc mb-0">
                          {parse(`${item.description}`)}
                        </p>
                        {/* Renders a button to navigate to the single post page */}
                        <a
                          className=" d-lg-block  readmore"
                          onClick={() =>
                            navigate(`/singlePost?postid=${item._id}`)
                          }
                        >
                          Read more
                          <FiExternalLink />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="d-flex  flex-column align-items-center">
              <Lottie
                animationData={LodingAnimation}
                className="loadingAnimation"
              />
              <h1 className=" mt-1 ">Loading...</h1>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Home;
