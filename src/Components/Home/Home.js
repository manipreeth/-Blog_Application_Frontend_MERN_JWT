import React, { useState, useEffect } from "react";
import axios from "axios";
import "./home.css";

import UserImg from "../../images/userPic.png";

import { FiExternalLink } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import parse from "html-react-parser";

function Home() {
  // Set up state to store post data retrieved from API
  const [post, handlePost] = useState("");

  // React Router's navigation hook
  const navigate = useNavigate();

  // Fetches post data from the backend API upon component mount
  useEffect(() => {
    axios
      .get("/posts")
      .then((res) => {
        const details = res.data.data;
        handlePost(details);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Render the component with the post data received from the API
  return (
    <div className="home  p-2 p-sm-3 container">
      {/* Checks if there are any posts */}
      {post.length > 0 &&
        // If post data is available, map through each post item and render a post component for each one
        // Loops through the posts and renders a UI for each post
        post.map((item) => {
          return (
            <div
              className="homePosts d-md-flex  justify-content-lg-between "
              key={item._id}
            >
              <div className="me-lg-5 test">
                <div className=" mx-1 ">
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

                {/* Renders the post image */}
                <img
                  src={item.image}
                  className="homePostImg "
                  alt="Post Image"
                />
              </div>
              <div className="mt-md-5 ms-md-2 mt-3 homepostDetails ">
                <h1 className=" postHeading ">{item.title}</h1>
                <div className="p-1 homePostD">
                  {/* Renders the post description */}
                  <p className="homePostdesc mb-0">
                    {parse(`${item.description}`)}
                  </p>
                  {/* Renders a button to navigate to the single post page */}
                  <a
                    className=" d-lg-block  readmore"
                    onClick={() => navigate(`/singlePost?postid=${item._id}`)}
                  >
                    Read more
                    <FiExternalLink />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Home;
