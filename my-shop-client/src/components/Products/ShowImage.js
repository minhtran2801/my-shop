import React from "react";
import { API } from "../../config";

const ShowImage = ({ product, url }) => {
  return (
    <div className="product-container">
      <img
        src={`${API}/${url}/photo/${product._id}`}
        alt={product.name}
        className="mb-3 product-img"
      />
    </div>
  );
};

export default ShowImage;
