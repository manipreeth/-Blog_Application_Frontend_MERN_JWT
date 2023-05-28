import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import "./profile.css";

import UserImg from "../../Assets/Images/userPic.png";
import EditProfile from "./EditProfile";
import { ParentContext } from "../../App";

function Profile() {
  const context = useContext(ParentContext);

  // Destructuring state and functions from parent component
  const [formInput, handleFormInput] = context.profile;
  const [profile, handleProfile] = context.activeProfile;

  // State to store user details retrieved from backend API
  const [userDetails, handleUserDetails] = useState([]);

  // Send JSON Web Token which is stored in LocalStorage for Authorization
  const token = localStorage.getItem("Blogospheretoken");

  // Fetching user details on component mount and whenever 'profile' state changes
  useEffect(() => {
    axios
      .get("https://blog-application-backend-5dvk.onrender.com/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        handleUserDetails(res.data.data);
      })
      .catch((err) => alert(err.response.data.message));
  }, [profile]);

  return (
    <div
      className={`routeLayout container py-3 d-md-flex flex-wrap ${
        profile ? "justify-content-around" : "justify-content-center"
      } `}
    >
      {/* Profile view */}
      {profile ? (
        <div>
          {/* User details */}
          <div className="d-flex align-items-center">
            <img
              src={
                userDetails.profileImage ? userDetails.profileImage : UserImg
              }
              className="profileImg m-1 my-2"
              alt="user Pic"
            />
            <div>
              <p className="ms-2 mb-0 fw-bolder">{userDetails.fullname}</p>
              {userDetails.username && (
                <p className="ms-3 mb-0">{userDetails.username}</p>
              )}
            </div>
          </div>
          {/* User information */}
          <div className="mt-3 d-flex ms-1 ">
            <div className="me-3 text-end">
              <p className="fw-bold">Email ID:</p>
              <p className="fw-bold">Mobile:</p>
              <p className="fw-bold">About:</p>
            </div>
            <div>
              <p>{userDetails.email}</p>
              <p>{userDetails.mobile}</p>
              <p className="aboutWidth">{userDetails.about}</p>
            </div>
          </div>
          <button
            className="btn btn-primary px-5"
            onClick={() => handleProfile(!profile)}
          >
            Edit Profile
          </button>
        </div>
      ) : (
        // Edit profile view
        <div className="d-flex justify-content-between">
          {/* User details */}
          <div className="d-none d-md-block me-5">
            <div className="d-flex align-items-center">
              <img
                src={
                  formInput.profileImage
                    ? URL.createObjectURL(formInput.profileImage)
                    : userDetails.profileImage || UserImg
                }
                className="profileImg m-1 my-2"
                alt="user profile pic"
              />
              <div>
                <p className="ms-2 mb-0 fw-bolder">{userDetails.fullname}</p>
                <p className="ms-3 mb-0">
                  {formInput.username
                    ? formInput.username
                    : userDetails.username}
                </p>
              </div>
            </div>
            {/* User information */}
            <div className="mt-3 d-flex ms-1 ">
              <div className="me-3 text-end">
                <p className="fw-bold">Email_ID:</p>
                <p className="fw-bold">Mobile:</p>
                <p className="fw-bold">About:</p>
              </div>
              <div>
                <p>{userDetails.email}</p>
                <p>
                  {formInput.mobile ? formInput.mobile : userDetails.mobile}
                </p>
                <p className="aboutWidth">
                  {formInput.about ? formInput.about : userDetails.about}
                </p>
              </div>
            </div>
          </div>
          <EditProfile user={userDetails} />
        </div>
      )}
    </div>
  );
}

export default Profile;
