import React, { useEffect, useState } from 'react'
import '../css/login.css'
import 'aos/dist/aos.css'; // Import AOS styles
import AOS from 'aos'; // Import AOS
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { set } from 'animejs';

export default function Login() {
  const [email, setEmail ] = useState('')
  const [password, setPassword ] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('');
  const navigate = useNavigate()
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const isAuthenticated = () => !!localStorage.getItem('token');
  
  // Handle Google OAuth Response
  function handleGoogleSignInResponse(response) {
    const userObject = jwtDecode(response.credential); // Decodes the JWT token
    console.log(userObject);

    // Send token to backend to create or login the user
    fetch('https://1uaneumo6k.execute-api.eu-north-1.amazonaws.com/prod/api/auth/google', {
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
          navigate('/'); // Redirect user to homepage
          window.location.reload()
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
        client_id: clientId , // Replace with your actual Google client ID
        callback: handleGoogleSignInResponse,
      });
      window.google.accounts.id.renderButton(
        document.getElementById('googleSignInButton'),
        { theme: 'outline', size: 'large' } // Customize the button
      );
    }
  }, []);

  useEffect(() => {
    if(isAuthenticated()){
      navigate('/')
    }
  },[navigate])

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true)
  
    try {
      const response = await fetch('https://1uaneumo6k.execute-api.eu-north-1.amazonaws.com/prod/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
          body: JSON.stringify({ email, password }),
      });
      
      const rawData = await response.json();
      console.log('Raw Response Data:', rawData);
      
      const data = rawData.body && typeof rawData.body === 'string'
      ? JSON.parse(rawData.body)
      : rawData;
      
      // Log the entire response and data
      console.log('Response object:', response);
      console.log('Data object:', data);
  
      // Check if response is successful and token is present
      if (response.ok && data.token) {
        localStorage.setItem('token', data.token); 
        console.log('Token stored:', data.token); // Token stored successfully
        navigate('/');  // Redirect to home page
        window.location.reload()
      } else {
        if (data.msg === 'Invalid credentials') {
          setError('Invalid email or password. Please try again.');
        } else if (data.msg === 'Email not verified') {
          setError('Please verify your email before logging in.');
        } else {
          setError(data.msg || 'An error occurred. Please try again.');
        }
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error('Fetch error:', err);
    } finally {
      setIsLoading(false)
    }

    console.log(error)
  };
  
  

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

   const handleGoogleSignIn = () => {
    if (window.google) {
      window.google.accounts.id.prompt(); // Show the Google Sign-In prompt
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center" data-aos="fade-up" data-aos-delay="300">
      {/* Image container */}
      <div className="lg:w-1/2 w-full">
        <img 
          src='/assets/banner.png' 
          alt="Banner" 
          className="w-full h-auto object-cover" 
        />
      </div>

      {/* Form container */}
      <div className="lg:w-1/2 w-full lg:py-0 flex flex-col items-center justify-center rounded-xl lg:mr-8" >
        <div action="">
          <div className="w-full flex items-center justify-center">
            <div className="max-w-md w-full p-6">
              <h1 className="text-3xl font-semibold mb-6 text-black text-center"> LOGIN </h1>
              <h1 className="text-lg font-semibold mb-6 text-gray-500 text-center">Join our Community with all-time access and free benefits</h1>
              
              {/* Social sign up buttons */}
              <div className="mt-4 flex flex-col lg:flex-row items-center justify-between">
                <div className="w-full mb-2 lg:mb-0 flex justify-center">
                  <button className="signin text-lg" onClick={handleGoogleSignIn}>
                    <svg
                      viewBox="0 0 256 262"
                      preserveAspectRatio="xMidYMid"
                      xmlns="http://www.w3.org/2000/svg"
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
                </div>

            <div className="mt-4 text-sm text-gray-600 text-center">
              <p>or with email</p>
            </div>

            {/* Email sign up form */}
                <form  method="POST" className="space-y-4" onSubmit={handleLogin}>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input 
                      type="text" 
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
                    <button
                      className="group_button text-lg relative inline-flex items-center justify-center overflow-hidden rounded-md bg-black backdrop-blur-lg px-6 py-2 font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-gray-600/50 border border-white/20 w-full"
                      type='submit'
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="spinner-border animate-spin inline-block w-5 h-5 border-4 border-t-transparent border-white rounded-full"></div>
                      ) : (
                        'Login'
                      )}
                      <div
                        className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]"
                      >
                        <div className="relative h-full w-10 bg-white/20"></div>
                      </div>
                    </button>
                  </div>
                </form>
                <span className='mt-5 text-red-600'>{error}</span>

                  <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">Don't have an account? <Link to='/register' className="text-yellow-500 hover:text-yellow-600 font-semibold">Register</Link></p>
                  </div>
                  <div className=" text-center">
                    <p className="text-sm text-gray-500">Forgot your password? <Link to='/reset-password' className="text-yellow-500 hover:text-yellow-600 font-semibold">Reset Password</Link></p>
                  </div>
                  </div>
                  </div>
                </div>
            </div>
       </div>
  );
}
