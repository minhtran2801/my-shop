import React from "react";
import Menu from "../Navbar/Menu";

const AuthLayout = ({ children }) => {
  return (
    <div>
      <Menu />
      <div className="auth">
        <div className="bg-image"></div>
        <div className="form-box">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
