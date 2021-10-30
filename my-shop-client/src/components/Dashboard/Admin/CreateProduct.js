import React, { useState, useEffect } from "react";
import AdminDashboardLayout from "../../Layout/AdminDashboardLayout";
import { isAuthenticated } from "../../../api/customerAPIs";
import { createProduct, getCategories } from "../../../api/adminApi";

import uploadImage from "../../../assets/forms/upload.svg";

const CreateProduct = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    ingredients: [],
    directions: "",
    price: "",
    categories: [],
    category: "",
    quantity: "",
    photo: "",
    shipping: "",
    loading: false,
    error: "",
    createdProduct: "",
    redirectToProfile: false,
    formData: "",
    success: false,
  });
  const [photoPreview, setPhotoPreview] = useState("");

  const { user, token } = isAuthenticated();
  const {
    name,
    description,
    ingredients,
    directions,
    price,
    categories,
    category,
    quantity,
    shipping,
    photo,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData,
    success,
  } = values;

  // Load categories and set formdata
  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          categories: data.data,
          formData: new FormData(),
        });
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  const handleChange = (field) => (event) => {
    const value =
      field === "photo" ? event.target.files[0] : event.target.value;
    formData.set(field, value);
    setValues({ ...values, [field]: value });
    if (event.target.files) {
      setPhotoPreview(URL.createObjectURL(event.target.files[0]));
    }
  };

  const clearFields = () => {
    document.getElementById("imgUpload").value = "";
    setPhotoPreview("");
    setValues({
      ...values,
      name: "",
      description: "",
      ingredients: [],
      directions: "",
      price: "",
      category: "",
      quantity: "",
      photo: "",
      shipping: "",
      loading: true,
      error: "",
      createdProduct: "",
      redirectToProfile: false,
      formData: new FormData(),
      success: true,
    });
  };

  const onSubmitForm = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", success: false });
    createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        clearFields();
      }
    });
  };

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      New product is added
    </div>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const infoForm = () => {
    return (
      <div className="pt-4 px-3">
        <div className="card mb-4">
          <div className="card-header bg-white">
            <h4>Product Information</h4>
          </div>
          <div className="card-body">
            <div className="mb-4">
              <label htmlFor="productName" className="form-label">
                Product Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Product Name"
                value={name}
                onChange={handleChange("name")}
                id="productName"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="productDescription" className="form-label">
                Product Description
              </label>
              <textarea
                type="text"
                className="form-control"
                placeholder="Product Description"
                rows="4"
                value={description}
                onChange={handleChange("description")}
                id="productDescription"
              />
            </div>
            <div className="row">
              <div className="col-lg-4">
                <div className="mb-4">
                  <label htmlFor="price" className="form-label">
                    Price
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">$</span>
                    <input
                      type="number"
                      min="0.00"
                      max="10000.00"
                      step="0.01"
                      className="form-control"
                      placeholder="Price"
                      value={price}
                      onChange={handleChange("price")}
                      id="price"
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="mb-4">
                  <label htmlFor="quantity" className="form-label">
                    Quantity
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={handleChange("quantity")}
                    id="quantity"
                  />
                </div>
              </div>
              <div className="col-lg-4">
                <div className="mb-4">
                  <label htmlFor="shipping" className="form-label">
                    Shipping
                  </label>
                  <select
                    value={shipping}
                    onChange={handleChange("shipping")}
                    className="form-select"
                    aria-label="shipping"
                  >
                    <option>Please select</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-header bg-white">
            <h4>Ingredients And Directions</h4>
          </div>
          <div className="card-body">
            <div className="mb-4">
              <label htmlFor="ingredients" className="form-label">
                Ingredients
              </label>
              <textarea
                type="text"
                className="form-control"
                placeholder={`Seperate ingredients by new line if necessary.\nE.g\nIngredient 1\nIngredient 2`}
                rows="4"
                value={ingredients}
                onChange={handleChange("ingredients")}
                id="ingredients"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="directions" className="form-label">
                Directions
              </label>
              <textarea
                type="text"
                className="form-control"
                placeholder="Directions to use"
                rows="4"
                value={directions}
                onChange={handleChange("directions")}
                id="directions"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const imageAndCategoryForm = () => {
    return (
      <div className="pt-4">
        <div className="card mb-4">
          <div className="card-header bg-white">
            <h4>Image</h4>
          </div>
          <div className="card-body">
            <div className="image-upload text-center">
              <img
                src={photoPreview !== "" ? photoPreview : uploadImage}
                alt="upload image"
              />
              <input
                className="form-control"
                type="file"
                onChange={handleChange("photo")}
                accept="image/png, image/jpeg"
                id="imgUpload"
              />
            </div>
          </div>
        </div>
        <div className="card mb-4">
          <div className="card-header bg-white">
            <h4>Categories</h4>
          </div>
          <div className="card-body">
            <div className="form-group">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <select
                value={category}
                onChange={handleChange("category")}
                className="form-select"
                id="category"
              >
                <option>Please select</option>
                {categories &&
                  categories.map((cat, index) => (
                    <option key={index} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>
        <div>
          {showSuccess()}
          {showError()}
          <button
            type="submit"
            className="btn btn-success btn-md rounded font-sm hover-up w-100"
          >
            Save
          </button>
          <button
            type="button"
            onClick={clearFields}
            className="btn btn-outline-secondary rounded font-sm mt-3 text-body hover-up w-100"
          >
            Reset
          </button>
        </div>
      </div>
    );
  };

  const formLayout = () => {
    return (
      <form onSubmit={onSubmitForm}>
        <div className="row">
          <div className="col-9">
            <div className="content-header pt-4 px-3">
              <h1 className="content-title">
                <span>Create New Product</span>
              </h1>
            </div>
          </div>
          <div className="col-lg-6">{infoForm()}</div>
          <div className="col-lg-3">{imageAndCategoryForm()}</div>
        </div>
      </form>
    );
  };

  return <AdminDashboardLayout>{formLayout()}</AdminDashboardLayout>;
};

export default CreateProduct;
