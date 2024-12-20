// App.js
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ConfirmEmail from './components/ConfirmEmail';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/Dashboard';
import AdminSpace from './pages/AdminSpace';
import TitleAnimation from './animations/TitleAnimation';
import ProductAnimation from './animations/ProductAnimation';
import Layout from './components/Layout';
import Shop from './pages/Shop';
import ResetPasswordForm from './pages/ResetPassword';
import AdminSidebar from './components/AdminSidebar';
import AddProductForm from './components/ProductsTable';
import ProductDetails from './pages/ProductDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/project-title" element={<TitleAnimation />} />
          <Route path="/project-product" element={<ProductAnimation />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/details" element={<ProductDetails />} />
          <Route path="/update-password" element={<ResetPasswordForm />} />
          <Route path="/reset-password" element={<ForgotPassword />} />
          <Route path="/confirm/:token" element={<ConfirmEmail />} />
          <Route path="/dashboard/*" element={<DashboardPage />} /> 
          <Route path="/admin-profile/*" element={<AdminSpace />} /> 
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
