import React from "react";
import HeroImage from "./HeroImage";
import HomeLayout from "../Layout/HomeLayout";

const Home = () => {
  return <HomeLayout>{<HeroImage />}</HomeLayout>;
};

export default Home;
