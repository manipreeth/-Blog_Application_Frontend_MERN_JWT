import React from "react";
import { useNavigate } from "react-router-dom";

function BannerHeading() {
  const navigate = useNavigate();

  return (
    <>
      <h1 className="blogHeading mb-4">
        Share Your Unique Story in BlogoSphere
      </h1>
      <button
        className="btn btn-success px-5 py-2 ms-3"
        onClick={() => navigate("/login")}
      >
        Get Started
      </button>
    </>
  );
}

export default BannerHeading;
