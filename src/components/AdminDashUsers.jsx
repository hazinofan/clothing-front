import { useEffect, useState } from 'react';
import axios from 'axios';
import { FiEdit } from 'react-icons/fi';

const AdminDashUsers = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');  
      if (!token) {
        console.error('No token found');
        return;
      }
    
      try {
        const response = await fetch('https://1uaneumo6k.execute-api.eu-north-1.amazonaws.com/prod/api/user/getusers', {
          method: 'GET',
        });
  
        if (response.ok) {
          const data = await response.json();
          const parsedData = JSON.parse(data.body)
          console.log(parsedData);
          
          setUserData(parsedData);
        } else {
          console.error('Failed to fetch user data:', response.status);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="container mx-auto mt-10 pt-24 px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Users List</h1>
      <div className="shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full bg-white border-separate table-auto border border-gray-200">
          <thead>
            <tr className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-lg">
              <th className="py-4 px-6">Name</th>
              <th className="py-4 px-6 text-center">Email</th>
              <th className="py-4 px-6 text-center">Role</th>
              <th className="py-4 px-6 text-center">Status</th>
              <th className="py-4 px-6 text-center">Orders</th>
              <th className="py-4 px-6 text-center">Edit</th>
            </tr>
          </thead>
          <tbody>
            {userData.length > 0 ? (
              userData.map((user) => (
                <tr key={user._id} className="bg-white border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-4 px-6 text-center">{user.name}</td>
                  <td className="py-4 px-6 text-center">{user.email}</td>
                  <td className="py-4 px-6 text-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      user.isAdmin ? 'bg-green-200 text-green-800' : 'bg-blue-200 text-blue-800'
                    }`}>
                      {user.isAdmin ? 'Admin' : 'User'}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status || 'Active'}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">{user.orders || 'No Orders Yet'}</td>
                  <td className="py-4 px-6 text-center">
                    <button className=''> <FiEdit /> Edit </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500 text-lg">
                  Loading ...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashUsers;
