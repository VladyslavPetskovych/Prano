import React from "react";
import Contact from "../components/contactPage/contact";
import AboutUs from "../components/contactPage/about";

function Contacts() {
  return (
    <div>
     <Contact backgroundClass={"bg-black"} />
      <AboutUs />
    </div>
  );
}

export default Contacts;
