import React from "react";
import { HiCode } from "react-icons/hi";

function Logo() {
  return (
    <div className="CoderBlog">
      <div className="d-flex coderBlogLogo">
        <HiCode className="coderBlogIcon tc-orange" />
        <h1>
          <span className="tc-orange">Coder </span>
          Blog
        </h1>
      </div>
      <p className="coderBlogtitle">
        A place for <span className="tc-orange">programmers</span> by a{" "}
        <span className="tc-orange">programmer.</span>
      </p>
    </div>
  );
}

export default Logo;
