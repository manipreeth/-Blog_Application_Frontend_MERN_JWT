import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { ParentContext } from "../../App";

import Description from "./description/Description";
import axios from "axios";
import { useNavigate } from "react-router";

function CreatePost() {
  // Get the nav state and handleNavState function from context
  const context = useContext(ParentContext);
  const [navState, handleNavState] = context.nav;

  // React router hook for navigation
  const navigate = useNavigate();

  // State variables for the post form
  const [description, setDescription] = useState("");
  const [postForm, handlePostForm] = useState({
    title: "",
    category: "",
  });

  // State variable for the label of the post button
  const [postbtnLabel, handlePostbtnLabel] = useState(true);

  // Handle the change of the post image (Event handler for file input)
  const changeHandler = (e) => {
    handlePostForm({ ...postForm, [e.target.name]: e.target.files[0] });
  };

  // Handle the input of the post form
  const inputHandler = (e) => {
    handlePostForm({
      ...postForm,
      [e.target.name]: e.target.value,
    });
  };

  // Handle the submission of the post form
  const handleSubmit = (e) => {
    e.preventDefault();

    // Update the button label to show loading state
    handlePostbtnLabel(false);

    // Extract the form data to be sent to the server
    const { title, category, postImage } = postForm;
    const postDetails = {
      title,
      category,
      postImage,
      description: description,
    };

    // Send JSON Web Token which is stored in LocalStorage for Authorization
    const token = localStorage.getItem("token");

    // Send a POST request to the server to create a new post
    axios
      .post("/posts", postDetails, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // Clear the post form and alert the success status
        handlePostForm({
          title: "",
          category: "",
          postImage: null,
        });
        setDescription("");
        handlePostbtnLabel(true);
        // navigate("/posts");
        alert(res.data.status);
      })
      .catch((err) => {
        handlePostbtnLabel(true);
        // Show an alert with the error message on failed creation of the post
        alert(err.response.data.message);
      });
  };

  return (
    <div className="container routeLayout p-3  createPost">
      {/* The post creation form */}
      <Form onSubmit={handleSubmit}>
        {/* Form input for post title */}
        <Form.Group className=" mb-4 mb-md-3">
          <Form.Label htmlFor="title">Post Title:</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Post Heading"
            value={postForm.title}
            onChange={(e) => inputHandler(e)}
            name="title"
            id="title"
          />
        </Form.Group>

        {/* Form input for post image */}
        <Form.Group className=" mb-3">
          <Form.Label htmlFor="postImage">Post Image:</Form.Label>
          <Form.Control
            type="file"
            required
            name="postImage"
            onChange={changeHandler}
            id="postImage"
          />
        </Form.Group>
        {/* Form input for post category */}
        <Form.Group className=" mb-4 mb-md-3">
          <Form.Label htmlFor="category">Post Category:</Form.Label>
          <Form.Select
            required
            value={postForm.category}
            onChange={(e) => inputHandler(e)}
            name="category"
            id="category"
          >
            <option>Select the Category</option>
            <option value="Agriculture">Agriculture</option>
            <option value="Army">Army</option>
            <option value="HTML">HTML</option>
            <option value="Bussiness">Bussiness</option>
            <option value="Accounting">Accounting</option>
            <option value="Trading">Trading</option>
            <option value="Geography">Geography</option>
            <option value="Politics">Politics</option>
            <option value="Sports">Sports</option>
            <option value="Others">Others</option>
          </Form.Select>
        </Form.Group>

        {/* Form input for post description */}
        <Form.Group className=" mb-3">
          <Form.Label>Post Description:</Form.Label>
          <Description setDescription={setDescription} />
        </Form.Group>

        {navState ? (
          <Button type="submit">
            {postbtnLabel ? "Publish" : "Please Wait While publishing..."}
          </Button>
        ) : (
          <Button type="submit" onClick={() => navigate("/login")}>
            Login to post
          </Button>
        )}
      </Form>
    </div>
  );
}

export default CreatePost;
