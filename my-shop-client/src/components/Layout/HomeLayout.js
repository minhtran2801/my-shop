import React from "react";
import Navbar from "../Navbar/Navbar";

const HomeLayout = ({ className, children }) => {
  return (
    <div>
      <Navbar />
      <div className={className}>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default HomeLayout;
