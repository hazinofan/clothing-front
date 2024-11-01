import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ConfirmEmail = () => {
  const { token } = useParams(); // Get the token from the URL parameters
  const [message, setMessage] = useState(''); // State to store the message
  const [loading, setLoading] = useState(true); // State to manage loading status

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        // Correct the URL to include http:// or https://
        const response = await axios.get(`http://localhost:5000/api/auth/confirm/${token}`); // Call the API to confirm email
        setMessage(response.data.msg); // Set the success message
      } catch (error) {
        setMessage(error.response?.data?.msg || 'An error occurred during email confirmation.'); // Handle error message
      } finally {
        setLoading(false); // Set loading to false once done
      }
    };

    confirmEmail(); // Invoke the email confirmation function
  }, [token]);

  if (loading) {
    return <p>Loading...</p>; // Display loading state
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Email Confirmation</h1>
      <p className="mt-4 text-lg">{message}</p> {/* Display the message */}
    </div>
  );
};

export default ConfirmEmail;
