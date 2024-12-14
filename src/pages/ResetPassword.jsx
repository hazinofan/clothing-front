import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import '../css/login.css'; // Import your CSS file for styling

export default function ResetPasswordForm() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token'); // Extract the token from the URL
  const navigate = useNavigate();

  // Password strength validation
  const isPasswordStrong = (password) => 
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);

  // Handle password reset
  const handleResetPassword = async (e) => {
    e.preventDefault();
  
    if (!newPassword || !confirmPassword) {
      setError('All fields are required.');
      return;
    }
  
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
  
    if (!isPasswordStrong(newPassword)) {
      setError('Password must be at least 8 characters long and include uppercase, lowercase, numbers, and symbols.');
      return;
    }
  
    setError('');
    setIsLoading(true);
  
    try {
      console.log('Sending request with:', { token, newPassword }); // Debugging log
      const response = await fetch(
        'https://1uaneumo6k.execute-api.eu-north-1.amazonaws.com/prod/api/user/reset-password',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Ensure the token is valid
          },
          body: JSON.stringify({ newPassword }), // Ensure this matches backend expectations
        }
      );
  
      const data = await response.json();
      console.log('Response from server:', data); // Debugging log
  
      if (response.ok) {
        setMessage('Password reset successfully. Redirecting to login...');
        setTimeout(() => navigate('/login', { state: { alert: 'Password reset successfully!' } }), 3000);
      } else {
        setError(data.msg || 'Failed to reset password. Please try again.');
      }
    } catch (err) {
      console.error('Error occurred:', err);
      setError('An error occurred while resetting the password. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-6 shadow-lg rounded-xl border border-gray-200">
        <h1 className="text-3xl font-semibold mb-6 text-center text-black">Reset Password</h1>
        <p className="text-center text-gray-500 mb-6">Enter a new password for your account</p>

        {message && <p className="text-green-600 text-center mb-4">{message}</p>}
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        {!message && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-200 transition-all duration-300"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-200 transition-all duration-300"
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={isLoading} // Disable button while loading
                className={`relative inline-flex items-center justify-center rounded-md ${
                  isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black'
                } px-6 py-2 text-base font-semibold text-white transition-all duration-300 hover:scale-110 hover:shadow-lg border border-white/20 w-full`}
              >
                {isLoading ? 'Resetting...' : 'Reset Password'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
