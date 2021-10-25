import React from "react";

const Banner = () => {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Discover the Supplement World</h1>

        <h2 className="hero-subtitle">
          We offer the best supplements and vitamins for you health!
        </h2>

        <button
          type="button"
          className="hero-button btn btn-dark btn-lg"
          to={"/shop"}
        >
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default Banner;
