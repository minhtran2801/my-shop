import React from "react";
import Navbar from "../Navbar/Navbar";

const HomeLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default HomeLayout;
