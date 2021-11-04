import React, { useState } from "react";
import { API } from "../../config";

const ShowImage = ({ product, url }) => {
  const [btnDisplay, setBtnDisplay] = useState({
    display: "none",
    backgroundColor: "none",
  });

  const showBtn = (e) => {
    e.preventDefault();
    setBtnDisplay({
      display: "block",
      backgroundImage:
        "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))",
    });
  };

  const hideBtn = (e) => {
    e.preventDefault();
    setBtnDisplay({ display: "none" });
  };
  return (
    <div className="img-wrapper" onMouseEnter={showBtn} onMouseLeave={hideBtn}>
      <img
        src={`${API}/${url}/photo/${product._id}`}
        alt={product.name}
        className="mb-3 product-img"
      />
      <div className="img-overlay" style={btnDisplay}>
        <button type="button" className="cart-btn btn btn-dark btn-lg w-75">
          <i className="fas fa-cart-plus fa-fw me-2"></i>
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ShowImage;
