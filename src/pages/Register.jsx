import React, { useState, useEffect } from 'react';
import '../css/login.css';
import 'aos/dist/aos.css'; // Import AOS styles
import AOS from 'aos'; // Import AOS
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const isAuthenticated = () => !!localStorage.getItem('token'); // Utility to check authentication status

  // Handle Google OAuth Response
  function handleGoogleSignInResponse(response) {
    const userObject = jwtDecode(response.credential); // Decodes the JWT token
    console.log(userObject);

    // Send token to backend to create or login the user
    fetch('http://localhost:5000/api/auth/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: response.credential }), // Sending the Google token to the backend
    })  
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token); // Store JWT token in localStorage
          alert('Login successful with Google!');
          navigate('/');
        } else {
          setError('Google login failed. Try again.');
        }
      })
      .catch((err) => {
        console.error(err);
        setError('Something went wrong with Google login.');
      });
  }

  useEffect(() => {
    if (window.google) {
      // Initialize Google Sign-In
      window.google.accounts.id.initialize({
        client_id: clientId, // Replace with your actual Google client ID
        callback: handleGoogleSignInResponse,
      });
      window.google.accounts.id.renderButton(
        document.getElementById('googleSignInButton'),
        { theme: 'outline', size: 'large' } // Customize the button
      );
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/');
    }
  }, [navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      console.log('Data object:', data);

      if (response.ok) {
        alert('Account created Successfully! Please check your email to verify your account.');
        navigate('/login');
      } else {
        setError(data.msg || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // Handle Google Sign-In Button Click
  const handleGoogleSignIn = () => {
    if (window.google) {
      window.google.accounts.id.prompt(); // Show the Google Sign-In prompt
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center" data-aos="fade-up" data-aos-delay="300">
      {/* Image container */}
      <div className="lg:w-1/2 w-full">
        <img src='/assets/register_banner.png' alt="Banner" className="w-full h-auto object-cover" />
      </div>

      {/* Form container */}
      <div className="lg:w-1/2 w-full lg:py-0 flex flex-col items-center justify-center rounded-xl lg:mr-8" style={{ border: "1px solid #D3D3D3" }}>
        <div className="w-full flex items-center justify-center">
          <div className="max-w-md w-full p-6">
            <h1 className="text-3xl font-semibold mb-6 text-black text-center">REGISTER</h1>
            <h1 className="text-lg font-semibold mb-6 text-gray-500 text-center">Create an account and enjoy the benefits</h1>
            
            {/* Custom Google Button */}
            <div id="googleSignInButton">
            <button className="signin text-lg flex items-center justify-center mb-5" onClick={handleGoogleSignIn}> {/* Keep your styles here */}
              <svg
                viewBox="0 0 256 262"
                preserveAspectRatio="xMidYMid"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mr-2"
              >
                <path
                  d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                  fill="#4285F4"
                ></path>
                <path
                  d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                  fill="#34A853"
                ></path>
                <path
                  d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                  fill="#FBBC05"
                ></path>
                <path
                  d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                  fill="#EB4335"
                ></path>
              </svg>
              Sign in with Google
            </button>
            </div>

            <div className=" text-center">
                <span className=' text-gray-500 ' > or with email </span>
            </div>  

            {/* Registration form */}
            <form method="POST" className="space-y-4" onSubmit={handleRegister}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name </label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                  className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-200 focus:transition-all focus:duration-300"
                />
              </div>
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
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                  className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-200 focus:transition-all focus:duration-300"
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input 
                  type="password" 
                  id="confirmPassword" 
                  name="confirmPassword" 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                  required 
                  className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-200 focus:transition-all focus:duration-300"
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <div>
              <button
                      className="group_button relative inline-flex items-center justify-center overflow-hidden rounded-md bg-black backdrop-blur-lg px-6 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-gray-600/50 border border-white/20 w-full"
                    >
                      <span className="text-lg" type='submit'>Login</span>
                      <div
                        className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]"
                      >
                        <div className="relative h-full w-10 bg-white/20"></div>
                      </div>
                    </button>
              </div>
            </form>

            {/* Already have an account */}
            <p className="text-center text-gray-600 mt-6">
              Already have an account?{' '}
              <Link to="/login" className="text-yellow-400 hover:underline">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
