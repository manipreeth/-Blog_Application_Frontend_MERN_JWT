import React, { useState, useContext } from "react";
import { HiOutlinePencil } from "react-icons/hi";
import { ParentContext } from "../../App";
import Form from "react-bootstrap/Form";

import UserImg from "../../images/userPic.png";
import axios from "axios";

function EditProfile(props) {
  // props and context variables are initialized here
  const userDetails = props.user;
  const context = useContext(ParentContext);
  const [formInput, handleFormInput] = context.profile;
  const [profile, handleProfile] = context.activeProfile;
  const [btnlabel, handleBtnLabel] = useState(true);

  // Function to update user's profile
  const update = () => {
    const { profileImage, username, about, gender } = formInput;
    handleBtnLabel(!btnlabel);

    // Send JSON Web Token which is stored in LocalStorage for Authorization
    const token = localStorage.getItem("token");

    axios
      .put(
        "/users/update",
        {
          profileImage: profileImage || userDetails.profileImage,
          username: username || userDetails.username,
          about: about || userDetails.about,
          gender: gender || userDetails.gender,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        handleProfile(!profile);
      })
      .catch((err) => {
        handleBtnLabel(!btnlabel);
        // console.log(err);
        alert(err.response.data.message);
      });
  };

  // Function to handle changes in the profile image input field
  const changeHandler = (e) => {
    handleFormInput({ ...formInput, [e.target.name]: e.target.files[0] });
  };

  // Function to handle changes in the other input fields
  const inputHandler = (e) => {
    handleFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    });
  };

  // "Update profile photo by hovering on user pic and clicking the edit option to choose a new photo."
  return (
    <div className="profileEdit ms-md-5">
      {/* Profile image and username */}
      <div className="d-flex  align-items-center">
        <div className=" position-relative profileImgP m-1">
          <img
            src={
              formInput.profileImage
                ? URL.createObjectURL(formInput.profileImage)
                : userDetails.profileImage || UserImg
            }
            className="profileImg  m-1 me-0"
            alt="profile pic"
          />
          <div className="position-absolute top-0 start-0 m-1 profileImgEdit">
            <p className=" text-white fw-bolder mt-4 pt-4">
              Edit&nbsp;
              <HiOutlinePencil />
              <input
                type="file"
                className="position-absolute top-50 start-0 opacity-0 "
                onChange={changeHandler}
                name="profileImage"
              />
            </p>
          </div>
        </div>

        <div className="mt-2">
          <p className="ms-1 mb-0 fw-bolder">{userDetails.fullname}</p>
          <p className="ms-2 mb-0">{userDetails.username}</p>
        </div>
      </div>

      {/* ------------------- Form Inputs ---------------------- */}
      <div className="my-2 mt-4">
        {/* Email value is taken from props sent to this component */}
        <div className="mb-2">
          <label htmlFor="email" className="ms-2 me-1">
            Email_ID:
          </label>
          <input
            className="p-2 m-1  ms-3"
            type="email"
            value={userDetails.email}
            aria-label="Disabled input"
            id="email"
            name="email"
            onChange={(e) => inputHandler(e)}
            disabled
            readOnly
          />
        </div>

        {/* mobile number value is taken from props sent to this component */}
        <div className="my-2">
          <label className="d-block mb-1">
            Mobile_No:
            <input
              className="p-2 m-1 mt-2 ms-2 bc-orange"
              type="text"
              value={userDetails.mobile}
              onChange={(e) => inputHandler(e)}
              name="mobile"
              disabled
              readOnly
            />
          </label>
        </div>

        {/* Username */}
        <div className="mb-2">
          <label htmlFor="username" className=" me-1 text-start">
            Username:
          </label>
          <input
            className="p-2 m-1 bc-orange  ms-2"
            type="username"
            value={
              userDetails.username ? userDetails.username : formInput.username
            }
            aria-label="Disabled input"
            id="username"
            name="username"
            onChange={(e) => inputHandler(e)}
          />
        </div>

        {/* About section of user */}
        <div className=" mb-2">
          <label>About:</label>
          &nbsp;&nbsp;
          <textarea
            className="ms-md-5 mb-2 profileAbout bc-orange"
            value={userDetails.about ? userDetails.about : formInput.about}
            onChange={(e) => inputHandler(e)}
            name="about"
          ></textarea>
        </div>

        {/* Gender of user */}
        <div className=" mb-3">
          <Form.Select
            required
            value={userDetails.gender ? userDetails.gender : formInput.gender}
            onChange={(e) => inputHandler(e)}
            name="gender"
            className="d-inline "
          >
            <option>Select Your Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </Form.Select>
        </div>
      </div>
      <button className="btn btn-primary px-5 ms-5 mb-2" onClick={update}>
        {btnlabel ? "Save Changes" : "Updating changes..."}
      </button>
    </div>
  );
}

export default EditProfile;
