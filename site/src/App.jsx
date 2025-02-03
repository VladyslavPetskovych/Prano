import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import UpperHeader from "./components/utils/upperHeader.jsx";
import Header from "./components/utils/header.jsx";
import Footer from "./components/utils/footer.jsx";

import Home from "./pages/home.jsx";
import Services from "./pages/services.jsx";
import Cleaning from "./pages/cleaning.jsx";
import Laundry from "./pages/laundry.jsx";

import ShoesCleaning from "./pages/shoesCleaning.jsx";

import ShoesRepair from "./pages/shoesRepair.jsx";
import Price from "./pages/price.jsx";
import Contacts from "./pages/contacts.jsx";
import Cabinet from "./pages/cabinet.jsx";

const App = () => {
  return (
    <Router>
      <UpperHeader />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/cleaning" element={<Cleaning />} />
        <Route path="/services/laundry" element={<Laundry />} />
        <Route path="/services/shoes-cleaning" element={<ShoesCleaning />} />
        <Route path="/services/shoes-repair" element={<ShoesRepair />} />
        <Route path="/price" element={<Price />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/cabinet" element={<Cabinet />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export { App };
