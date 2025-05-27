import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux";
import { HelmetProvider } from "react-helmet-async";

// Компоненти
import UpperHeader from "./components/utils/upperHeader.jsx";
import Header from "./components/utils/header.jsx";
import Footer from "./components/utils/footer.jsx";
import ScrollToTop from "./components/utils/scrollToTop.jsx";
import LoadingScreen from "./components/utils/loadingScreen.jsx";

// Сторінки
import Home from "./pages/home.jsx";
import Services from "./pages/services.jsx";
import Blog from "./pages/blogList.jsx";
import Textile from "./pages/textile.jsx";
import Fur from "./pages/fur.jsx";
import BlogDetails from "./pages/blogDetails.jsx";
import Price from "./pages/price.jsx";
import Contacts from "./pages/contacts.jsx";
import Account from "./pages/account.jsx";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import ActivateAccount from "./components/utils/ActivateAccount.jsx";
import PrivateRoute from "./components/adminpanel/privateRoute.jsx";
import AdminPanel from "./pages/adminpanel.jsx";
import LandingPage from "./pages/LandingPage.jsx";

const AppContent = ({ isMaintenanceMode }) => {
  const location = useLocation();
  const [routeLoading, setRouteLoading] = useState(false);

  useEffect(() => {
    setRouteLoading(true);
    const timer = setTimeout(() => {
      setRouteLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return isMaintenanceMode ? (
    <LandingPage />
  ) : (
    <>
      <ScrollToTop />
      <UpperHeader />
      <Header />
      {routeLoading && <LoadingScreen />} {/* <- показуємо поверх */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/price" element={<Price />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/account" element={<Account />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/activate/:token" element={<ActivateAccount />} />
        <Route path="/admin" element={<PrivateRoute element={AdminPanel} />} />
        <Route path="/textile" element={<Textile />} />
        <Route path="/fur" element={<Fur />} />
      </Routes>
      <Footer />
    </>
  );
};

const App = () => {
  const [initialLoading, setInitialLoading] = useState(true);
  const isMaintenanceMode = false;

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  if (initialLoading) {
    return <LoadingScreen />;
  }

  return (
    <Provider store={store}>
      <HelmetProvider>
        <Router>
          <AppContent isMaintenanceMode={isMaintenanceMode} />
        </Router>
      </HelmetProvider>
    </Provider>
  );
};

export { App };
