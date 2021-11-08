import React from "react";
import { API } from "../../config";
import InfoLayout from "../Layout/InfoLayout";

const ProductInfo = ({ product }) => {
  return (
    <div className="container pt-5">
      <div className="row">
        <div className="col-md-5">
          <div className="bg-light">
            <img
              src={`${API}/products/photo/${product._id}`}
              alt={product.name}
              className="mb-3 product-img"
            />
          </div>
        </div>
        <div className="col-md-7">
          <div className="ps-5">
            <div>
              <h2>{product.name}</h2>
              <p className="fs-5">$ {product.price.toFixed(2)}</p>
            </div>
            <div className="py-3">
              <button
                type="button"
                className="cart-btn btn btn-dark btn-lg px-3 py-2"
              >
                <i className="fas fa-cart-plus fa-fw me-2"></i>
                Add To Cart
              </button>
            </div>
            <InfoLayout
              heading="General Information"
              content={product.description}
            />
            <InfoLayout heading="Ingredients" content={product.ingredients} />
            <InfoLayout heading="Directions" content={product.directions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
