import React from "react";
import { Link } from "react-router-dom";
import ShowImage from "./ShowImage";

const ProductCard = ({ product }) => {
  return (
    <div className="col-md-4 mb-3">
      <Link to="/" className="text-dark text-decoration-none">
        <div className="bg-light">
          <ShowImage product={product} url="products" />
        </div>
        <div className="pt-2">{product.name}</div>
        <div className="pt-2">$ {product.price.toFixed(2)}</div>
      </Link>
    </div>
  );
};

export default ProductCard;
