import React, { useState } from "react";
import AdminDashboardLayout from "../../Layout/AdminDashboardLayout";
import { isAuthenticated } from "../../../api/customerAPIs";
import { createCategory } from "../../../api/adminApi";

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
    <div className="container">
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
    </div>
  );

  return (
    <AdminDashboardLayout>
      <h1>Create A New Category</h1>
      {showSuccess()}
      {showError()}
      {newCategoryForm}
    </AdminDashboardLayout>
  );
};

export default CreateCategory;
