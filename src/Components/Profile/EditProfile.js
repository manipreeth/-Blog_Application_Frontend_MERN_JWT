import React, { useState, useContext } from "react";
import { HiOutlinePencil } from "react-icons/hi";
import { ParentContext } from "../../App";
import Form from "react-bootstrap/Form";

import UserImg from "../../Assets/Images/userPic.png";
import axios from "axios";

function EditProfile(props) {
  // props and context variables are initialized here
  const userDetails = props.user;
  const context = useContext(ParentContext);
  const [formInput, handleFormInput] = context.profile;
  const [profile, handleProfile] = context.activeProfile;
  const [btnlabel, handleBtnLabel] = useState(true);

  // Check if user clicked the button
  const [btnClicked, setBtnClicked] = useState(false);

  // Check if user edited a field.
  const [editFields, setEditFields] = useState({
    mobile: false,
    username: false,
    about: false,
    gender: false,
  });

  // Function to update user's profile
  const update = () => {
    const { profileImage, mobile, username, about, gender } = formInput;

    // check if mobile number is valid according to reference of below numbers
    if (
      mobile < "1000000000" ||
      mobile === "1234567890" ||
      mobile === "9876543210" ||
      mobile === "5678901234" ||
      mobile === "0000000000" ||
      mobile === "1111111111" ||
      mobile === "2222222222" ||
      mobile === "3333333333" ||
      mobile === "4444444444" ||
      mobile === "5555555555" ||
      mobile === "6666666666" ||
      mobile === "7777777777" ||
      mobile === "8888888888" ||
      mobile === "9999999999"
    ) {
      return alert("Invalid mobile number");
    } else {
      handleBtnLabel(false);
      setBtnClicked(true);
      // Send JSON Web Token which is stored in LocalStorage for Authorization
      const token = localStorage.getItem("token");

      axios
        .put(
          "https://blog-application-backend-5dvk.onrender.com/users/update",
          {
            profileImage: profileImage || userDetails.profileImage,
            mobile: mobile || userDetails.mobile,
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
          setEditFields({
            mobile: false,
            username: false,
            about: false,
            gender: false,
          });
          handleFormInput({
            profileImage: null,
            mobile: null,
            username: "",
            about: "",
            gender: "",
          });
          handleProfile(!profile);
          setBtnClicked(false);
          handleBtnLabel(true);
        })
        .catch((err) => {
          setBtnClicked(false);
          handleBtnLabel(true);
          if (
            err.response.data.message ==
            "Cannot read property 'path' of undefined"
          )
            alert("Please reupload your profile image!");
        });
    }
  };

  // Function to handle changes in the profile image input field
  const changeHandler = (e) => {
    handleFormInput({ ...formInput, [e.target.name]: e.target.files[0] });
  };

  // Function to handle changes in the other input fields
  const inputHandler = (e) => {
    const fieldName = e.target.name;

    handleFormInput({
      ...formInput,
      [fieldName]: e.target.value,
    });

    setEditFields((prevState) => ({
      ...prevState,
      [fieldName]: true,
    }));
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
          <p className="ms-2 mb-0">
            {formInput.username || editFields.username
              ? formInput.username
              : userDetails.username}
          </p>
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
              type="tel"
              value={
                formInput.mobile || editFields.mobile
                  ? formInput.mobile
                  : userDetails.mobile
              }
              onChange={(e) => inputHandler(e)}
              name="mobile"
              min="1000000000"
              max="9999999999"
              minLength="10"
              maxLength="10"
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
              formInput.username || editFields.username
                ? formInput.username
                : userDetails.username
            }
            aria-label="Disabled input"
            id="username"
            name="username"
            onChange={(e) => inputHandler(e)}
          />
        </div>

        {/* About section of user */}
        <div className=" mb-2 d-md-flex align-items-md-start">
          <label>About:</label>
          &nbsp;&nbsp;&nbsp;
          <textarea
            className="ms-md-4 mb-2 profileAbout bc-orange"
            value={
              formInput.about || editFields.about
                ? formInput.about
                : userDetails.about
            }
            onChange={(e) => inputHandler(e)}
            name="about"
          ></textarea>
        </div>

        {/* Gender of user */}
        <div className=" mb-3">
          <Form.Select
            required
            value={
              formInput.gender || editFields.gender
                ? formInput.gender
                : userDetails.gender
            }
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
      <button
        className="btn btn-primary px-5 ms-5 mb-2"
        onClick={update}
        disabled={btnClicked}
      >
        {btnlabel ? "Save Changes" : "Updating changes..."}
      </button>
    </div>
  );
}

export default EditProfile;
