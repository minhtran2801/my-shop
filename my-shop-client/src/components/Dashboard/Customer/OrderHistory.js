import React from "react";
import CustomerDashboardLayout from "../../Layout/CustomerDashboardLayout";

const DashboardOrder = () => {
  const orderHistory = () => {
    return (
      <div className="card mb-5">
        <div className="card-header">
          <h3>Order History</h3>
          <ul className="list-group">
            <li className="list-group-item">Name</li>
          </ul>
        </div>
      </div>
    );
  };

  return <CustomerDashboardLayout>{orderHistory()}</CustomerDashboardLayout>;
};

export default DashboardOrder;
