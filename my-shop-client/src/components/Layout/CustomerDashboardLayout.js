import React from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Dashboard/Sidebar";

const CustomerDashboardLayout = ({ className, children }) => {
  return (
    <div>
      <Navbar />
      <div className="grid-box">
        <div className="bg-image"></div>
        <div className="center-box container rounded bg-white mt-5 mb-5 border">
          <div className="row flex-nowrap">
            <div className="col-auto col-md-5 col-lg-4 col-xl-3 px-sm-2 px-0 bg-light border-end">
              <Sidebar />
            </div>
            <div className="col px-3 pt-2">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboardLayout;
