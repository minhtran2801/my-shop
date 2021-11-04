import React from "react";
import { isAuthenticated } from "../../../api/customerAPIs";
import CustomerDashboardLayout from "../../Layout/CustomerDashboardLayout";

const EditProfile = () => {
  const {
    user: { f_name, l_name, email, role },
  } = isAuthenticated();

  const customerInfo = () => {
    return (
      <div className="card mb-5">
        <div className="card-header">
          <h3>Edit Profile</h3>
          <hr />
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

  return <CustomerDashboardLayout>{customerInfo()}</CustomerDashboardLayout>;
};

export default EditProfile;
