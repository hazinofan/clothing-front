import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function DashProfile() {
  const [userData, setUserData] = useState({});
  const [wishlist, setWishlist] = useState([
    { id: 1, name: 'Red T-Shirt', price: '$20', image: '/images/red-tshirt.jpg' },
    { id: 2, name: 'Blue Jeans', price: '$40', image: '/images/blue-jeans.jpg' },
    { id: 3, name: 'White Sneakers', price: '$60', image: '/images/white-sneakers.jpg' },
  ]);

  useEffect(() => {
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
            'Authorization': `Bearer ${token}`, // Add the token in the Authorization header
            'Content-Type': 'application/json'
          }
        });
  
        if (response.ok) {
          const data = await response.json(); 
          const parseData = JSON.parse(data.body)
          setUserData(parseData)
        } else {
          console.error('Failed to fetch user data:', response.status);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData()
  },[])


  return (
    <>
      <h1 className='text-4xl text-center pt-32'> MY PROFILE </h1>
      <div className="my-10">
        <h4 className='mb-6 text-2xl text-yellow-600'> My informations :</h4>
        <div className="flex gap-3 text-center mb-7">
          <label className='text-xl underline mr-2'> Full Name : </label>
          <p className='text-xl text-green-700'> {userData.name || 'Loading ...'} </p>
        </div>
        <div className="flex gap-3 text-center mb-7">
          <label className='text-xl underline mr-2'> Email : </label>
          <p className='text-xl text-green-700'> {userData.email || 'Loading ...'} </p>
        </div>

        {/* Wishlist Section */}
        <h4 className='mb-6 text-2xl text-yellow-600'> My Wishlist :</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.length > 0 ? (
            wishlist.map((item) => (
              <div key={item.id} className="border rounded-lg shadow-md p-4">
                <img src='/assets/landing4.jpg' alt={item.name} className="w-full h-48 object-cover mb-4 rounded-md" />
                <h5 className="text-lg font-semibold mb-2">{item.name}</h5>
                <p className="text-md text-gray-700 mb-4">{item.price}</p>
                <button type='submit' className="rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-indigo-600 text-indigo-600 text-white">
                <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-indigo-600 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
                <span className="relative text-indigo-600 transition duration-300 group-hover:text-white ease">View Details</span>
              </button>
              </div>
            ))
          ) : (
            <p className="text-center col-span-3">Your wishlist is empty.</p>
          )}
        </div>

        <p className='mt-10 text-center'> Want to update your information? Please visit <Link to='/dashboard/security' className='text-red-600'>Manage My Account</Link></p>
      </div>
    </>
  );
}
