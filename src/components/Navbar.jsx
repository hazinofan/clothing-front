import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/navbar.css'; // Ensure to add appropriate CSS
import logo from '../assets/logo.png'; // Update with your logo path
import { FaBagShopping, FaUser } from 'react-icons/fa6';
import { FaRegHeart } from 'react-icons/fa';

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const navigate = useNavigate();

  const fetchUserData = async () => {
    const token = localStorage.getItem('token');  
    if (!token) {
      console.error('No token found');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/api/user/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Add the token in the Authorization header
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json(); 
        setUserData(data); // Save the fetched user data
      } else {
        console.error('Failed to fetch user data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const checkLoginStatus = () => {
    const userLoggedIn = localStorage.getItem('token'); 
    setIsLoggedIn(!!userLoggedIn);
  };

  useEffect(() => {
    // Check if user is logged in and fetch data on mount
    checkLoginStatus();
    if (isLoggedIn) {
      fetchUserData();
    }

    // Listen to storage changes (e.g., login or logout from another tab or window)
    window.addEventListener('storage', checkLoginStatus);

    // Cleanup listener when component unmounts
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, [isLoggedIn]); // Fetch only once when the component mounts or login status changes

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    closeDropdown();
  };

  const signout = () => {
    localStorage.removeItem('token');
    checkLoginStatus(); // Recheck login status after signout
    navigate('/login');
  };

  return (
    <nav className="navbar bg-white shadow-md">
      <div className="container mx-auto flex flex-col items-center py-4">
        {/* Top Row: Logo, Search Bar, Icons */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Logo" className="h-10" />
          </Link>

          {/* Search Bar */}
          <div className="flex-grow mx-6">
            <div className="relative">
              <input
                type="text"
                className=" border border-gray-300 rounded-full py-2 px-4" 
                style={{width: '600px'}}
                placeholder="Search"
              />
              <svg className="absolute right-4 top-3 h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m1.35-6.15a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z" />
              </svg>
            </div>
          </div>

          {/* Icons Section */}
          <div className="flex items-center space-x-6">
            <FaRegHeart className="text-lg text-gray-600" />
            {isLoggedIn && userData ? (
              <div className="relative">
                <button
                  type="button"
                  className="text-gray-600 focus:outline-none"
                  onClick={toggleDropdown}
                >
                  <FaUser className="text-sm" />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
                    <div className="px-4 pt-3 pb-0">
                      <span className="block text-sm">{userData.name}</span>
                      <span className="block text-xs text-gray-500">{userData.email}</span>
                      {userData.isAdmin ? (
                        <span className="block text-xs text-rose-500">(Your Admin)</span>
                      ) : null}
                    </div>
                    <ul className="py-2">
                      {userData.isAdmin && (
                        <li>
                        <button
                          onClick={() => handleNavigation('/admin-profile/stats')}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Admin Space
                        </button>
                      </li>
                      )} 
                      {userData.isAdmin ? '' : 
                        <li>
                        <button
                          onClick={() => handleNavigation('/dashboard/profile')}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Dashboard
                        </button>
                      </li>
                      }          
                      <li>
                        <button
                          onClick={() => handleNavigation('/dashboard/profile')}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Wishlist
                        </button>
                      </li>
                      
                      <li>
                        <button
                          onClick={() => handleNavigation('/dashboard/security')}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Settings
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={signout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Sign out
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="text-gray-600 hover:text-red-600">
                Login
              </Link>
            )}
            <div className="relative">
              <FaBagShopping className="text-lg text-gray-600" />
              <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs px-1">
                0
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Row: Navbar Links */}
        <ul className="flex space-x-8 mt-4 text-lg">
          <li>
            <Link to="/" className="text-gray-900 hover:text-red-600">Women</Link>
          </li>
          <li>
            <Link to="/" className="text-gray-900 hover:text-red-600">Men</Link>
          </li>
          <li>
            <Link to="/" className="text-gray-900 hover:text-red-600">Kids & Baby</Link>
          </li>
          <li>
            <Link to="/" className="text-gray-900 hover:text-red-600">Home</Link>
          </li>
          <li>
            <Link to="/" className="text-gray-900 hover:text-red-600">Shoes</Link>
          </li>
          <li>
            <Link to="/" className="text-gray-900 hover:text-red-600">Jewelry</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
