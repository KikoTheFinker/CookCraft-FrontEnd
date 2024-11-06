import React from "react";
import Header from "./HomeComponents/Header";
import Hero from "./HomeComponents/Hero";
import FeaturedRecipes from "./HomeComponents/FeaturedRecipes";
import Categories from "./HomeComponents/Categories";
import Nationalities from "./HomeComponents/Nationalities";
import Footer from "./HomeComponents/Footer";

function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <FeaturedRecipes />
      <Categories />
      <Nationalities />
      <Footer />
    </div>
  );
}

export default Home;
