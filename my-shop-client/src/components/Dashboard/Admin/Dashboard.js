import React from "react";
import AdminDashboardLayout from "../../Layout/AdminDashboardLayout";
import { isAuthenticated } from "../../../api/customerAPIs";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const {
    user: { _id, f_name, l_name, email, role },
  } = isAuthenticated();

  const adminLinks = () => {
    return (
      <div className="card">
        <h4 className="card-header">Admin Links</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/create/category">
              Create Category
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/create/product">
              Create Product
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminInfo = () => {
    return (
      <div className="card mb-5">
        <div className="card-header">
          <h3>My Account</h3>
          <ul className="list-group">
            <li className="list-group-item">{f_name}</li>
            <li className="list-group-item">{l_name}</li>
            <li className="list-group-item">{email}</li>
            <li className="list-group-item">
              {role === 1 ? "Admin" : "Registered user"}
            </li>
          </ul>
        </div>
      </div>
    );
  };

  return <AdminDashboardLayout>{adminInfo()}</AdminDashboardLayout>;
};

export default AdminDashboard;