import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { FaBagShopping, FaUser } from 'react-icons/fa6';
import { FaRegHeart } from 'react-icons/fa';

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
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
    checkLoginStatus();
    if (isLoggedIn) {
      fetchUserData();
    }

    window.addEventListener('storage', checkLoginStatus);

    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // Change background after scrolling down 50px
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('storage', checkLoginStatus);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLoggedIn]);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setDropdownOpen(false);
  };

  const signout = () => {
    localStorage.removeItem('token');
    checkLoginStatus();
    navigate('/login');
  };

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-white/70 shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-300">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="h-10" />
        </Link>

        {/* Icons and Links Section */}
        <div className="flex items-center space-x-8">
          {/* Menu Links */}
          <div className={`flex space-x-8 text-sm font-medium ${scrolled ? 'text-black' : 'text-white'}`}>
            <Link to="/men" className="hover:text-gray-500">
              MEN
            </Link>
            <Link to="/lookbook" className="hover:text-gray-500">
              LOOKBOOK
            </Link>
            <Link to="/about" className="hover:text-gray-500">
              ABOUT
            </Link>
            <button onClick={() => setDropdownOpen(false)} className="hover:text-gray-500">
              UNITED STATES
            </button>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-6 text-lg">
            <FaRegHeart className={`${scrolled ? 'text-black' : 'text-white'} hover:text-gray-500`} />

            {isLoggedIn && userData ? (
              <div className="relative">
                <button
                  type="button"
                  className={`${scrolled ? 'text-black' : 'text-white'} hover:text-gray-500 focus:outline-none`}
                  onClick={toggleDropdown}
                >
                  <FaUser />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
                    <div className="px-4 pt-3 pb-0">
                      <span className="block text-sm">{userData.name}</span>
                      <span className="block text-xs text-gray-500">{userData.email}</span>
                      {userData.isAdmin && (
                        <span className="block text-xs text-rose-500">(Admin)</span>
                      )}
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
                      <li>
                        <button
                          onClick={() => handleNavigation('/dashboard/profile')}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {userData.isAdmin ? 'Dashboard' : 'Wishlist'}
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
              <Link to="/login" className={`${scrolled ? 'text-black' : 'text-white'} hover:text-gray-500`}>
                Login
              </Link>
            )}
            
            <div className="relative">
              <FaBagShopping className={`${scrolled ? 'text-black' : 'text-white'} hover:text-gray-500`} />
              <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs px-1">
                0
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
