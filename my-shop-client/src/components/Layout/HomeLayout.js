import React from "react";
import Footer from "../Navbar/Footer";
import Navbar from "../Navbar/Navbar";
import Newsletter from "../Homepage/Newsletter";

const HomeLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
      {Newsletter()}
      <Footer />
    </div>
  );
};

export default HomeLayout;
