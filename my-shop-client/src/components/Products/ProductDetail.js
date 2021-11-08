import React, { useState, useEffect } from "react";
import HomeLayout from "../Layout/HomeLayout";
import { getSingleProduct } from "../../api/productsAPIs";
import ProductInfo from "./ProductInfo";
import Loading from "./Loading";

const ProductDetail = (props) => {
  const [productState, setProductState] = useState({});

  const loadSingleProduct = (productId) => {
    getSingleProduct(productId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProductState(data);
      }
    });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, [props]);

  return (
    <HomeLayout>
      {productState && productState.name ? (
        <ProductInfo product={productState} />
      ) : (
        Loading()
      )}
    </HomeLayout>
  );
};

export default ProductDetail;
