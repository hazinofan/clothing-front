import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import DashProfile from '../components/DashProfile';
import DashAdress from '../components/DashAdress';
import DashMesures from '../components/DashMesures';
import DashUpdate from '../components/DashUpdate';
import DashCoupons from '../components/DashCoupons';
import DashBonuses from '../components/DashBonuses';
import DashOrders from '../components/DashOrders';

const DashboardPage = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
        <Routes>
          <Route path="profile" element={<DashProfile />} />
          <Route path="addressbook" element={<DashAdress />} />
          <Route path="measurements" element={<DashMesures />} />
          <Route path="security" element={<DashUpdate />} />
          <Route path="coupons" element={<DashCoupons />} />
          <Route path="bonuses" element={<DashBonuses />} />
          <Route path="orders" element={<DashOrders />} />
        </Routes>
      </div>
    </div>
  );
};

export default DashboardPage;
