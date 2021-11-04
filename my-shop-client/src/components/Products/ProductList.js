import React, { useState, useEffect } from "react";

import HomeLayout from "../Layout/HomeLayout";
import ProductCard from "./ProductCard";
import ProductFilters from "./ProductSidebar/ProductFilters";

import { getCategories } from "../../api/adminAPIs";
import { getFilteredProducts } from "../../api/productsAPIs";

import ProductNotFound from "../../assets/products/no-product.png";

const ProductList = () => {
  const [categories, setCategories] = useState([]);
  const [filterState, setFilterState] = useState({
    filters: { category: [], price: [] },
  });
  const [limit, setLimits] = useState(9);
  const [skip, setSkip] = useState(0);
  const [filteredProducts, setFilteredResults] = useState([]);

  const { filters } = filterState;

  const loadFilteredProducts = (newFilters) => {
    getFilteredProducts(skip, limit, newFilters.filters).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setFilteredResults(data.products);
        console.log(data);
      }
    });
  };

  const loadCategories = () => {
    if (categories.length === 0) {
      getCategories().then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setCategories(data.data);
        }
      });
    }
  };

  // Load categories and products when component mounts
  useEffect(() => {
    loadCategories();
    loadFilteredProducts(filters);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleFilters = (filters_param) => {
    setFilterState(filters_param);
    loadFilteredProducts(filters_param);
  };

  return (
    <HomeLayout>
      <div className="container">
        <div className="py-5 text-center">
          <h2>VITAMINS</h2>
        </div>
        <div className="row">
          <div className="col-md-4 col-lg-3">
            <ProductFilters
              categories={categories}
              handleFilters={(f) => handleFilters(f)}
            />
          </div>
          <div className="col-md-8 col-lg-9">
            {filteredProducts.length > 0 ? (
              <div className="row">
                {filteredProducts.map((product, i) => (
                  <ProductCard
                    key={i}
                    className="col-md-4 pb-5"
                    product={product}
                  />
                ))}
              </div>
            ) : (
              <div className="d-flex justify-content-center align-items-center bg-light h-100">
                <img src={ProductNotFound} alt="Not found product" />
              </div>
            )}
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default ProductList;
