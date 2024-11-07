// Layout.js
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop'
import Navbar from './Navbar'

const Layout = () => {
  const location = useLocation();
  const hideFooterPaths = ['/login', '/register', '/forgot-password', '/dashboard', '/project-product' , 'project-title', '/admin-profile/stats', '/admin-profile/settings', '/admin-profile/products'];

  return (
    <>
      <Navbar />
      <ScrollToTop />
      <Outlet /> {/* This will render the matched route component */}
      {!hideFooterPaths.includes(location.pathname) && <Footer />}
    </>
  );
};

export default Layout;
