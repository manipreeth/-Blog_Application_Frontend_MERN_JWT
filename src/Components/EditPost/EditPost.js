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

  const changeHandler = (e) => {
    handlePostForm({ ...postForm, [e.target.name]: e.target.files[0] });
  };

  const inputHandler = (e) => {
    handlePostForm({
      ...postForm,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    // Send JSON Web Token which is stored in LocalStorage for Authorization
    const token = localStorage.getItem("token");

    axios
      .get(`/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        handlePostDetails(res.data.data);
        setDescription(res.data.data.description);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, category, postImage } = postForm;
    handlePostbtnLabel(!postbtnLabel);

    const Details = {
      title: title || postDetails.title,
      category: category || postDetails.category,
      postImage,
      description: description || postDetails.description,
    };

    // Send JSON Web Token which is stored in LocalStorage for Authorization
    const token = localStorage.getItem("token");

    axios
      .put(`/posts/${postId}`, Details, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        alert(res.data.status);
        navigate(`/posts`);
      })
      .catch((err) => {
        // alert(err.response.data.message);
        console.log(err);
      });
  };

  return (
    <div className="container routeLayout p-3 mt-md-3 createPost">
      <Form onSubmit={handleSubmit}>
        <Form.Group className=" mb-4">
          <Form.Label htmlFor="title">Post Title:</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Post Heading"
            value={postForm.title || postDetails.title}
            onChange={(e) => inputHandler(e)}
            name="title"
            id="title"
          />
        </Form.Group>

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

        <Form.Group className=" mb-4">
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

        <Form.Group className=" mb-3">
          <Form.Label>Post Description:</Form.Label>
          <Description
            setDescription={setDescription}
            initialValue={
              postDetails.description ? postDetails.description : null
            }
          />
        </Form.Group>

        {navState ? (
          <Button type="submit">
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
