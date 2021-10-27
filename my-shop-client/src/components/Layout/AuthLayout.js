import React from "react";
import Navbar from "../Navbar/Navbar";

const AuthLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="auth">
        <div className="bg-image"></div>
        <div className="form-box">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
