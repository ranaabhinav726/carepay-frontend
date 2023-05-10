import React from "react";

//project imports
import Header from "../../compponents/Header";
import Footer from "../../compponents/Footer";
import AboutUs from "./AboutUs";
import Team from "./Team";
import Partners from "./Partners";
import ContactForm from "./ContactForm";

const About = () => {
  return (
    <div>
      <Header HighlightLink={"AboutUs"} />
      <AboutUs />
      <Team />
      <Partners />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default About;
