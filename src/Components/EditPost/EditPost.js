import React, { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { ParentContext } from "../../App";

import Description from "../CreatePost/description/Description";
import axios from "axios";
import { useNavigate, useLocation } from "react-router";
import parse from "html-react-parser";

function EditPost() {
  const props = useContext(ParentContext);
  const [navState, handleNavState] = props.nav;
  const navigate = useNavigate();

  const search = useLocation().search;
  const postId = new URLSearchParams(search).get("postid");

  const [postDetails, handlePostDetails] = useState("");
  const [description, setDescription] = useState(
    postDetails ? parse(postDetails.description) || "" : ""
  );
  const [postForm, handlePostForm] = useState({
    title: "",
    category: "",
  });

  const [postbtnLabel, handlePostbtnLabel] = useState(true);
  const [btnClicked, setBtnClicked] = useState(false);

  // Check if user edited a field.
  const [editFields, setEditFields] = useState({
    title: false,
  });

  useEffect(() => {
    if (!navState) {
      navigate("/login"); // Navigate to the login route if user is not logged in
      return; // Stop further execution of the code
    }
    // Send JSON Web Token which is stored in LocalStorage for Authorization
    const token = localStorage.getItem("Blogospheretoken");

    axios
      .get(
        `https://blog-application-backend-5dvk.onrender.com/posts/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        handlePostDetails(res.data.data);
        setDescription(res.data.data.description);
      })
      .catch((err) => alert(err.response.data.message));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setBtnClicked(true);

    const { title, category, postImage } = postForm;
    handlePostbtnLabel(!postbtnLabel);

    const Details = {
      title: title || postDetails.title,
      category: category || postDetails.category,
      postImage,
      description: description || postDetails.description,
    };

    // Send JSON Web Token which is stored in LocalStorage for Authorization
    const token = localStorage.getItem("Blogospheretoken");

    axios
      .put(
        `https://blog-application-backend-5dvk.onrender.com/posts/${postId}`,
        Details,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setEditFields({
          title: false,
        });
        setBtnClicked(false);
        alert(res.data.status);
        navigate(`/posts`);
      })
      .catch((err) => {
        // alert(err.response.data.message);
        setBtnClicked(false);
        console.log(err);
      });
  };

  const changeHandler = (e) => {
    handlePostForm({ ...postForm, [e.target.name]: e.target.files[0] });
  };

  const inputHandler = (e) => {
    const fieldName = e.target.name;

    handlePostForm({
      ...postForm,
      [fieldName]: e.target.value,
    });

    setEditFields((prevState) => ({
      ...prevState,
      [fieldName]: true,
    }));
  };

  return (
    <div className="container routeLayout p-3 createPost">
      <Form onSubmit={handleSubmit}>
        <Form.Group className=" mb-4 mb-md-2">
          <Form.Label htmlFor="title">Post Title:</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Post Heading"
            // value={postForm.title || postDetails.title}
            value={editFields.title ? postForm.title : postDetails.title}
            onChange={(e) => inputHandler(e)}
            name="title"
            id="title"
          />
        </Form.Group>

        <Form.Group className=" mb-2">
          <Form.Label htmlFor="postImage">Post Image:</Form.Label>
          <Form.Control
            type="file"
            required
            name="postImage"
            onChange={changeHandler}
            id="postImage"
          />
        </Form.Group>

        <Form.Group className=" mb-4 mb-md-2">
          <Form.Label htmlFor="category">Post Category:</Form.Label>
          <Form.Select
            required
            value={postForm.category || postDetails.category}
            onChange={(e) => inputHandler(e)}
            name="category"
            id="category"
          >
            <option>Select the Category</option>
            <option value="Agriculture">Agriculture</option>
            <option value="Army">Army</option>
            <option value="HTML">HTML</option>
            <option value="Node Js">Node Js</option>
            <option value="Bussiness">Bussiness</option>
            <option value="Accounting">Accounting</option>
            <option value="Trading">Trading</option>
            <option value="Geography">Geography</option>
            <option value="Politics">Politics</option>
            <option value="Sports">Sports</option>
            <option value="Others">Others</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className=" mb-2">
          <Form.Label>Post Description:</Form.Label>
          <Description
            setDescription={setDescription}
            initialValue={
              postDetails.description ? postDetails.description : " "
            }
          />
        </Form.Group>

        {navState ? (
          <Button type="submit" disabled={btnClicked}>
            {postbtnLabel ? "Publish" : "Please Wait While Publishing... "}
          </Button>
        ) : (
          <Button type="submit" onClick={() => navigate("/login")}>
            Login to Edit
          </Button>
        )}
      </Form>
    </div>
  );
}

export default EditPost;
