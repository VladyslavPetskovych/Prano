import React, { useState, useEffect } from "react";
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
import Account from "./pages/account.jsx";
import Register from "./pages/register.jsx";

import { Provider } from "react-redux";
import store from "./redux";

import LoadingScreen from "./components/utils/loadingScreen.jsx";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Provider store={store}>
      <Router>
        {loading && <LoadingScreen />}
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
          <Route path="/account" element={<Account />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
};

export { App };
