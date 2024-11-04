import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import ForgotPassword from './pages/ForgotPassword';
import ConfirmEmail from './components/ConfirmEmail';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/Dashboard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AdminSpace from './pages/AdminSpace';
import TitleAnimation from './animations/TitleAnimation';
import ProductAnimation from './animations/ProductAnimation';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/project-title" element={<TitleAnimation />} />
          <Route path="/project-product" element={<ProductAnimation />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/confirm/:token" element={<ConfirmEmail />} />
          <Route path="/dashboard/*" element={<DashboardPage />} /> {/* The wildcard is important for nested routes */}
          <Route path="/admin-profile/*" element={<AdminSpace />} /> {/* The wildcard is important for nested routes */}
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
