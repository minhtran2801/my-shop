import React from "react";
import Footer from "../Navbar/Footer";
import Navbar from "../Navbar/Navbar";

const HomeLayout = ({ className, children }) => {
  return (
    <div>
      <Navbar />
      <div className={className}>
        <div>{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default HomeLayout;
