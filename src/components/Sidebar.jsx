import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Sidebar = () => {
  const [isOpen, setIsOpen] = React.useState(false); // Sidebar toggle for mobile

  return (
    <div className="lg:w-64 w-full lg:block bg-white shadow-lg pt-36">
      {/* Header for mobile view with toggle */}
      <div className="flex justify-between items-center p-6 lg:hidden border-b">
        <h2 className="text-gray-700 text-xl font-semibold">My Profile</h2>
        <button onClick={() => setIsOpen(!isOpen)}>
          <FaBars className="text-gray-700 text-2xl" />
        </button>
      </div>

      {/* Sidebar content */}
      <div
        className={`fixed lg:static inset-0 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out lg:translate-x-0 bg-white lg:bg-transparent z-50`}
      >
        {/* Close button for mobile */}
        <div className="flex justify-between items-center p-6 lg:hidden border-b">
          <h2 className="text-gray-700 text-xl font-semibold">My Profile</h2>
          <button onClick={() => setIsOpen(false)}>
            <FaTimes className="text-gray-700 text-2xl" />
          </button>
        </div>

        <h2 className="text-gray-700 text-xl font-semibold p-6 hidden lg:block">My Profile</h2>
        <ul className="space-y-2 p-6">
          <li className="text-gray-500 ml-2 text-lg mt-6">My Account</li>
          <li>
            <NavLink
              to="/dashboard/profile"
              className={({ isActive }) =>
                `block p-4  transition-all ${
                  isActive ? 'bg-black/90 text-white font-semibold' : 'text-gray-600 hover:bg-black/55 hover:text-white'
                }`
              }
            >
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/addressbook"
              className={({ isActive }) =>
                `block p-4  transition-all ${
                  isActive ? 'bg-black/90 text-white font-semibold' : 'text-gray-600 hover:bg-black/55 hover:text-white'
                }`
              }
            >
              My Addresses
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/measurements"
              className={({ isActive }) =>
                `block p-4  transition-all ${
                  isActive ? 'bg-black/90 text-white font-semibold' : 'text-gray-600 hover:bg-black/55 hover:text-white'
                }`
              }
            >
              My Measurements
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/security"
              className={({ isActive }) =>
                `block p-4 transition-all ${
                  isActive ? 'bg-black/90 text-white font-semibold' : 'text-gray-600 hover:bg-black/55 hover:text-white'
                }`
              }
            >
              Manage My Account
            </NavLink>
          </li>
          <li className="text-gray-500 ml-2 text-lg pt-8">My Assets</li>
          <li>
            <NavLink
              to="/dashboard/coupons"
              className={({ isActive }) =>
                `block p-4  transition-all ${
                  isActive ? 'bg-black/90 text-white font-semibold' : 'text-gray-600 hover:bg-black/55 hover:text-white'
                }`
              }
            >
              My Coupons
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/bonuses"
              className={({ isActive }) =>
                `block p-4  transition-all ${
                  isActive ? 'bg-black/90 text-white font-semibold' : 'text-gray-600 hover:bg-black/55 hover:text-white'
                }`
              }
            >
              My Bonus Points
            </NavLink>
          </li>
          <li className="text-gray-500 ml-2 text-lg mt-6">My Orders</li>
          <li>
            <NavLink
              to="/dashboard/orders"
              className={({ isActive }) =>
                `block p-4  transition-all ${
                  isActive ? 'bg-black/90 text-white font-semibold' : 'text-gray-600 hover:bg-black/55 hover:text-white'
                }`
              }
            >
              Active Orders
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
