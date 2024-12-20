import React, { useEffect, useState } from 'react'
import CardDataStats from './CardDataStats'
import UserGrowthChart from './UserGrowthChart'
import UsersTable from './UsersTable'

export default function AdminDashStats() {
    const [UserData, setUserData] = useState({})
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
              setUserData(data)
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
    <div className=' pt-28'>
        <h1 className=' text-3xl text-center mb-10'> Welcome Back Si <span className='text-4xl text-red-600'>{UserData.name }</span> </h1>
        <CardDataStats />
        <UserGrowthChart />
        <UsersTable />
    </div>
  )
}
