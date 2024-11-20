import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBagShopping, FaUser } from 'react-icons/fa6';
import { FaRegHeart } from 'react-icons/fa';

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('up');
  const navigate = useNavigate();
  const location = useLocation();

  const isLandingPage = location.pathname === '/';

  const fetchUserData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const response = await fetch('https://1uaneumo6k.execute-api.eu-north-1.amazonaws.com/prod/api/user/profile', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        const parseData = JSON.parse(data.body)
        console.log(parseData)
        setUserData(parseData);
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

    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // Change background after scrolling down 50px
      if (window.scrollY > lastScrollY) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      lastScrollY = window.scrollY;
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

  // Determine link and icon color based on landing page status and scroll position
  const linkColor = isLandingPage && !scrolled ? 'text-white' : 'text-black';

  return (
    <>
      {/* Navbar container with discount bar and main navbar */}
      <div className={`fixed w-full z-50 transition-transform duration-300 ${scrollDirection === 'down' ? '-translate-y-full' : 'translate-y-0'}`}>
        {/* Discount Bar */}
        <div className={`w-full backdrop-blur-lg text-black text-center py-1 ${scrolled ? 'backdrop-blur-lg' : 'bg-[#f0ede5]'}` }>
          50% discounts on all tops this weekend
        </div>

        {/* Main Navbar */}
        <nav className={`transition-colors duration-300 ${scrolled ? 'bg-white/70 shadow-lg' : 'bg-transparent'}`}>
          {/* Search Bar Overlay */}
          {showSearch && (
            <div
              className={`fixed w-full top-0 z-40 transition-colors duration-300 ${
                scrolled ? 'bg-white/70 shadow-lg' : 'bg-transparent'
              }`}
            >
              <div className="relative w-3/4 md:w-1/2 lg:w-1/3 mx-auto">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none"
                />
                <button
                  onClick={() => setShowSearch(false)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {/* Navbar Content */}
          <div className="flex items-center justify-between p-4 border-b border-black">
            {/* Logo */}
            <Link to="/" className="flex items-center">
            <div className=" text-4xl font-bold ml-10 p-0" style={{ fontFamily: "GT Flexa Trial Cm Md", letterSpacing: '2px' }}>
                AMCB
            </div>
            </Link>

            {/* Icons and Links Section */}
            <div className="flex items-center space-x-8">
              {/* Menu Links */}
              <div className={`flex space-x-8 text-sm font-medium ${linkColor}`}>
                <Link to="/" className="hover:text-gray-500">
                  HOME
                </Link>
                <Link to="/shop" className="hover:text-gray-500">
                  SHOP
                </Link>
                <Link to="/about" className="hover:text-gray-500">
                  ABOUT
                </Link>
                <button onClick={() => setShowSearch(!showSearch)} className="hover:text-gray-500">
                  SEARCH
                </button>
              </div>

              {/* Icons */}
              <div className="flex items-center space-x-6 text-lg">
                <FaRegHeart className={`${linkColor} hover:text-gray-500`} />

                {isLoggedIn && userData ? (
                  <div className="relative">
                    <button
                      type="button"
                      className={`${linkColor} hover:text-gray-500 focus:outline-none`}
                      onClick={toggleDropdown}
                    >
                      <FaUser />
                    </button>
                    {dropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
                        <div className="px-4 pt-3 pb-0">
                          <span className="block text-sm">{userData.name}</span>
                          <span className="block text-xs text-gray-500">
                          {userData?.email
                            ? userData.email.length > 15
                              ? `${userData.email.slice(0, 20)}...`
                              : userData.email
                            : 'Email not available'}
                          </span>
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
                  <Link to="/login" className={`${linkColor} hover:text-gray-500`}>
                    Login
                  </Link>
                )}

                <div className="relative">
                  <FaBagShopping className={`${linkColor} hover:text-gray-500`} />
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs px-1">
                    0
                  </span>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
