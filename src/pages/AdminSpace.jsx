import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import DashProfile from '../components/DashProfile';
import AdminSidebar from '../components/AdminSidebar';
import AdminDashStats from '../components/AdminDashStats';
import AdminAccountPanel from '../components/AdminAccountPanel';
import AdminDashUsers from '../components/AdminDashUsers';
import AddProduct from '../components/AdminDashProducts';
import AddProductForm from '../components/ProductsTable';

const AdminSpace = () => {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 p-6">
        <Routes>
          <Route path="stats" element={<AdminDashStats />} />
          <Route path="settings" element={<AdminAccountPanel />} />
          <Route path="users" element={<AdminDashUsers />} />
          <Route path="products" element={<AddProduct />} />
          <Route path="add-product" element={<AddProductForm />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminSpace;
