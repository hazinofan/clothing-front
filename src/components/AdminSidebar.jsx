import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaUser, FaChartBar, FaCog, FaSignOutAlt, FaProductHunt } from 'react-icons/fa'; // Added new icons
import admin from '../assets/profile.webp'

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = React.useState(false); // Sidebar toggle for mobile
  const [openDiv, setOpenDiv] = useState(false)
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('token');
    window.location.reload()
    navigate('/')    
  }

  const openLogoutPopup = () => {
    setOpenDiv(!openDiv)
  }


  return (
    <div className="lg:w-64 w-full lg:block bg-gradient-to-b from-purple-600 to-purple-900 shadow-xl h-auto">
      {/* Header for mobile view with toggle */}
      <div className="flex justify-between items-center p-6 lg:hidden">
        <h2 className="text-white text-xl font-semibold">Admin Dashboard</h2>
        <button onClick={() => setIsOpen(!isOpen)}>
          <FaBars className="text-white text-2xl" />
        </button>
      </div>

      {/* Sidebar content */}
      <div
        className={`fixed lg:static inset-0 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out lg:translate-x-0 z-50`}
      >
        {/* Close button for mobile */}
        <div className="flex justify-between items-center p-6 lg:hidden">
          <h2 className="text-white text-xl font-semibold">Admin Dashboard</h2>
          <button onClick={() => setIsOpen(false)}>
            <FaTimes className="text-white text-2xl" />
          </button>
        </div>

        {/* Sidebar Header for Desktop */}
        <div className="hidden lg:flex flex-col items-center text-center mt-6">
          <img
            className="rounded-full w-20 h-20 mb-4 border-4 border-white"
            src={admin} // Placeholder for profile picture
            alt="Admin"
          />
          <h3 className="text-white text-xl font-bold">Admin Name</h3>
        </div>

        {/* Navigation Links */}
        <nav className="mt-10 px-4">
          <ul className="space-y-4">
            <li>
              <NavLink
                to="/admin-profile"
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 text-white rounded-lg transition-all ${
                    isActive ? 'bg-purple-500' : 'hover:bg-purple-700'
                  }`
                }
              >
                <FaUser className="text-xl" />
                <span>My Account</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin-profile/stats"
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 text-white rounded-lg transition-all ${
                    isActive ? 'bg-purple-500' : 'hover:bg-purple-700'
                  }`
                }
              >
                <FaChartBar className="text-xl" />
                <span>Stats Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin-profile/settings"
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 text-white rounded-lg transition-all ${
                    isActive ? 'bg-purple-500' : 'hover:bg-purple-700'
                  }`
                }
              >
                <FaCog className="text-xl" />
                <span>Settings</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin-profile/users"
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 text-white rounded-lg transition-all ${
                    isActive ? 'bg-purple-500' : 'hover:bg-purple-700'
                  }`
                }
              >
                <FaUser className="text-xl" />
                <span>Users</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin-profile/products"
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 text-white rounded-lg transition-all ${
                    isActive ? 'bg-purple-500' : 'hover:bg-purple-700'
                  }`
                }
              >
                <FaProductHunt className="text-xl" />
                <span>Products</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                className="flex items-center gap-3 p-3 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                onClick={openLogoutPopup}
              >
                <FaSignOutAlt className="text-xl" />
                <span>Logout</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      {openDiv && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/75   bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-md shadow-md w-96">
          <h2 className="text-xl font-bold mb-4">Logging Out</h2>
          <p className="text-sm mb-6">Are you sure you want to logout ?</p>
          <div className="flex justify-end space-x-2">
            <button
              className="bg-gray-200 px-4 py-2 rounded-md"
              onClick={() => setOpenDiv(false)}
            >
              Cancel
            </button>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded-md"
              onClick={logout}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default AdminSidebar;
