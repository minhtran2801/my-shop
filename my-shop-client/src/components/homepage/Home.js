import React from "react";
import HeroImage from "./HeroImage";
import HomeLayout from "../Layout/HomeLayout";
import FeaturedProducts from "./FeaturedProducts";
import About from "./About";
import Newsletter from "./Newsletter";

const Home = () => {
  return (
    <HomeLayout>
      {HeroImage()}
      {FeaturedProducts()}
      {About()}
      {Newsletter()}
      {About()}
    </HomeLayout>
  );
};

export default Home;
