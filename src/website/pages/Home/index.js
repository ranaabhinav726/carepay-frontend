import React  from "react";

//project imports
import Header from "../../compponents/Header";
import Affordable from "./Affordable";
import Healthcare from "./Healthcare";
import Features from "./Features";
import Products from "./Products";
import OurWork from "./OurWork";
import Carousel from "./Carousel";
import Faqs from "./Faqs";
import Trusted from "./Trusted";
import Footer from "../../compponents/Footer";
import BusinessPartnerCarousel from "./Carousel-bootstrap";

const Home = () => {

  return (
    <div>
      <Header  />
      <Affordable />
      <Healthcare />
      <Features />
      <Products  />
      <OurWork />
      <BusinessPartnerCarousel />
      {/* <Carousel /> */}
      <Trusted />
      <Faqs />
      <Footer />
    </div>
  );
};

export default Home;
