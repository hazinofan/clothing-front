import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/login.css'; // Import your CSS file for styling

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

//   const handleForgotPassword = async (e) => {
//     e.preventDefault();
    
//     try {
//       const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setMessage('Check your email for password reset instructions.');
//       } else {
//         setError(data.msg || 'Something went wrong. Please try again.');
//       }
//     } catch (err) {
//       setError('An error occurred. Please try again.');
//     }
//   };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50" data-aos="fade-up" data-aos-delay="300">
      {/* Form container */}
      <div className="w-full max-w-md bg-white p-6 shadow-lg rounded-xl border border-gray-200">
        <h1 className="text-3xl font-semibold mb-6 text-center text-black">Forgot Password</h1>
        <p className="text-center text-gray-500 mb-6">Enter your email to reset your password</p>

        {message && <p className="text-green-600 text-center mb-4">{message}</p>}
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-200 focus:transition-all focus:duration-300"
            />
          </div>
          <div>
            <button
              type="submit"
              className="group/button relative inline-flex items-center justify-center overflow-hidden rounded-md bg-black backdrop-blur-lg px-6 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-gray-600/50 border border-white/20 w-full"
            >
              <span className="text-lg">Send Reset Link</span>
              <div
                className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]"
              >
                <div className="relative h-full w-10 bg-white/20"></div>
              </div>
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Remembered your password? <a href="/login" className="text-yellow-500 hover:text-yellow-600 font-semibold">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}