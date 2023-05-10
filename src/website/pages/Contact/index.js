import React from "react";

//project imports
import Header from "../../compponents/Header";
import Footer from "../../compponents/Footer";
import ContactForm from "./ContactForm";

const ContactUs = () => {
  return (
    <div>
      <Header HighlightLink={"ContactUs"} />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default ContactUs;
