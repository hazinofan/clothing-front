import React, { useState, useEffect } from 'react';
import { FaAddressBook } from 'react-icons/fa';

export default function DashAddress() {
  const [formData, setFormData] = useState({
    country: '',
    fullName: '',
    phoneNumber: '',
    address: '',
    city: '',
    province: '',
    zipCode: ''
  });

  const [showForm, setShowForm] = useState(false); // Control popup visibility
  const [loading, setLoading] = useState(true); // Loading state
  const [submittedData, setSubmittedData] = useState(null); // Store submitted data

  // Fetch address from the database on component mount
  useEffect(() => {
    const fetchAddress = async () => {
      const token = localStorage.getItem('token'); 

      if (!token) {
        console.error('User is not authenticated');
        return;
      }

      try {
        const response = await fetch('https://1uaneumo6k.execute-api.eu-north-1.amazonaws.com/prod/api/user/getaddress', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          const address = data.address;
          if (address) {
            setFormData(address); // Populate form with the fetched address
            setSubmittedData(address); // Display fetched data in the card
          }
        } else {
          console.error('Failed to fetch address');
        }
      } catch (error) {
        console.error('Failed to fetch address:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAddress();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); 

    if (!token) {
      console.error('User is not authenticated');
      return;
    }

    try {
      const response = await fetch('https://1uaneumo6k.execute-api.eu-north-1.amazonaws.com/prod/api/user/address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Shipping address updated successfully');
        setSubmittedData(formData); // Save the submitted data to display in a card
        setShowForm(false); // Close the popup
        console.log(formData)
      } else {
        console.error('Error updating shipping address');
      }
    } catch (error) {
      console.error('Failed to update shipping address:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen"> {/* Full height centering */}
          <div role="status" className="flex flex-col items-center">
              <svg
                  aria-hidden="true"
                  className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
              >
                  <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                  />
                  <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                  />
              </svg>
              <span className="sr-only">Loading...</span>
          </div>
      </div>
  );
  }

  return (
    <>
    <div className="text-center pt-32">
      <button
       className="box-border relative z-30 inline-flex items-center justify-center w-auto px-8 py-3 overflow-hidden font-bold text-white transition-all duration-300 bg-indigo-600 rounded-md cursor-pointer group ring-offset-2 ring-1 ring-indigo-300 ring-offset-indigo-200 hover:ring-offset-indigo-500 ease focus:outline-none"
       onClick={() => setShowForm(true)}
       >
        <span className="absolute bottom-0 right-0 w-8 h-20 -mb-8 -mr-5 transition-all duration-300 ease-out transform rotate-45 translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
        <span className="absolute top-0 left-0 w-20 h-8 -mt-1 -ml-12 transition-all duration-300 ease-out transform -rotate-45 -translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
        <span className="relative z-20 flex items-center text-sm">
        <FaAddressBook className='mr-5' />
        Add / Update Shipping Address
        </span>
      </button>
      </div>

      {/* Popup form */}
      {showForm && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50"
  >
    <div
      className="bg-white p-6 rounded shadow-lg w-96"
      style={{
        marginLeft: '277px',
        width: '600px',
        zIndex: 1000, // Ensure it's above other elements
      }}
    >
      <form onSubmit={handleSubmit}>
        <h2 className="text-xl mb-4">Update Shipping Address</h2>

        <div className="mb-4">
          <label>Country:</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label>Full Name:</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label>Province:</label>
          <input
            type="text"
            name="province"
            value={formData.province}
            onChange={handleChange}
            className="border rounded p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label>ZIP Code:</label>
          <input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          />
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            className="rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-indigo-600 text-indigo-600 text-white"
          >
            <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-indigo-600 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
            <span className="relative text-indigo-600 transition duration-300 group-hover:text-white ease">
              Submit
            </span>
          </button>

          <button
            type="button"
            className="px-4 py-0 bg-gray-400 text-white rounded hover:bg-gray-500"
            onClick={() => setShowForm(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
)}


      {/* Display submitted data in a card */}
      {submittedData && (
        <div className="max-w-xl mx-auto mt-8">
          <div className="bg-white p-6 rounded-lg shadow-md mt-24">
            <h2 className="text-xl font-bold mb-4 text-center">Your Shipping Address</h2>
            <div className="flex items-center space-x-4">
              <div className="bg-gray-100 p-4 rounded-lg shadow-md w-full">
                <p><strong>Country:</strong> {submittedData.country}</p>
                <p><strong>Full Name:</strong> {submittedData.fullName}</p>
                <p><strong>Phone Number:</strong> {submittedData.phoneNumber}</p>
                <p><strong>Address:</strong> {submittedData.address}</p>
                <p><strong>City:</strong> {submittedData.city}</p>
                <p><strong>Province:</strong> {submittedData.province}</p>
                <p><strong>ZIP Code:</strong> {submittedData.zipCode}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

