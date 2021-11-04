import React from "react";
import HeroImage from "./HeroImage";
import HomeLayout from "../Layout/HomeLayout";
import FeaturedProducts from "./FeaturedProducts";
import About from "./About";

const Home = () => {
  return (
    <HomeLayout>
      {HeroImage()}
      {FeaturedProducts()}
      {About()}
    </HomeLayout>
  );
};

export default Home;
