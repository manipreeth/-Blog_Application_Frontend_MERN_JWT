import { Routes, Route } from "react-router";
import Home from "../Home/Home";
import MyPosts from "../MyPosts/MyPosts";
import CreatePost from "../CreatePost/CreatePost";
import Profile from "../Profile/Profile";
import Register from "../Forms/Register";
import Login from "../Forms/Login";
import SinglePost from "../SinglePost/SinglePost";

// This component defines the routing configuration for the app using the
//  `Routes` and `Route` components from the `react-router` library.
// Each `Route` element defines a path and its corresponding component.
// The `element` prop specifies the component to be rendered when the path matches.
// This component is used in the main `App` component to render the correct component based on the current URL path.

function NavConfig() {
  return (
    <div className="navConfig ">
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="posts" element={<MyPosts />} />
        <Route path="createPost" element={<CreatePost />} />
        <Route path="profile" element={<Profile />} />
        <Route path="singlePost" element={<SinglePost />} />
      </Routes>
    </div>
  );
}

export default NavConfig;
