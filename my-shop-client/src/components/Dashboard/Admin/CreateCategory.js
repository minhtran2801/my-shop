import React, { useState } from "react";
import HomeLayout from "../../Layout/HomeLayout";
import { isAuthenticated } from "../../../api/userAuth";
import { createCategory } from "../../../api/category";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  // destructure user and info from localstorage
  const { user, token } = isAuthenticated();

  const handleChange = (e) => {
    setError("");
    setName(e.target.value);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Fetch create/category
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setError("");
        setSuccess(true);
      }
    });
  };

  const showSuccess = () => {
    if (success) {
      return (
        <h3 className="text-success">
          Category {name} is successfully created.
        </h3>
      );
    }
  };

  const showError = () => {
    if (error) {
      return <h3 className="text-danger">Category {name} already exists.</h3>;
    }
  };

  const newCategoryForm = (
    <form onSubmit={onFormSubmit}>
      <div className="form-group">
        <label className="text-muted">Category</label>
        <input
          type="text"
          className="form-control"
          onChange={handleChange}
          value={name}
          autoFocus
        />
      </div>
      <button className="btn btn-outline-primary">Create Category</button>
    </form>
  );

  return (
    <HomeLayout className="container-fluid bg-white mt-5 mb-5">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showSuccess()}
          {showError()}
          {newCategoryForm}
        </div>
      </div>
    </HomeLayout>
  );
};

export default CreateCategory;
