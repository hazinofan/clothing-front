import React, { useEffect, useState } from 'react';


const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/75   bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Delete Account</h2>
        <p className="text-sm mb-6">Are you sure you want to delete your account? This action cannot be undone.</p>
        <div className="flex justify-end space-x-2">
          <button
            className="bg-gray-200 px-4 py-2 rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-md"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

const AccountManagement = () => {
  const [points, setPoints] = useState(100);
  const [userData, setUserData] = useState({ email: '' });
  const [newEmail, setNewEmail] = useState('');
  const [emailUpdated, setEmailUpdated] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [openButton, setOpenButton] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Added state for confirm password
  const [passwordUpdated, setPasswordUpdated] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          const parseData = JSON.parse(data.body)
          console.log(parseData)
          setUserData(parseData);
        } else {
          console.error('Failed to fetch user data:', response.status);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdateEmail = () => {
    setOpenButton(!openButton);
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setPasswordError('New password and confirm password do not match');
      return;
    }

    if (!oldPassword || !newPassword) {
      setPasswordError('Old and New Passwords are required');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const response = await fetch('https://1uaneumo6k.execute-api.eu-north-1.amazonaws.com/prod/api/user/update-password', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ oldPassword, newPassword, confirmNewPassword: confirmPassword }) // Corrected the payload
      });

      if (response.ok) {
        setPasswordUpdated(true);
        setPasswordError('');
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword(''); // Clear all password inputs
      } else {
        const errorData = await response.json();
        setPasswordError(errorData.message || 'Failed to update password');
      }
    } catch (error) {
      setPasswordError('An error occurred while updating the password');
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (!confirmDelete) return;

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const response = await fetch('https://1uaneumo6k.execute-api.eu-north-1.amazonaws.com/prod/api/user/deleteprofile', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        alert('Account deleted successfully');
        localStorage.removeItem('token');
        window.location.href = '/';
      } else {
        console.error('Failed to delete account:', response.status);
      }
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  const handleEmailUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/user/update-email', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: newEmail })
      });

      if (response.ok) {
        setEmailUpdated(true);
        setEmailError('');
        const updatedData = await response.json();
        setUserData(updatedData.user);
      } else {
        const errorData = await response.json();
        setEmailError(errorData.message || 'Failed to update email');
      }
    } catch (error) {
      setEmailError('An error occurred while updating the email');
    }
  };

  const maskEmail = (email) => {
    if (!email) return '';
    const [localPart, domain] = email.split('@');
    const maskedLocalPart = `${localPart.slice(0, 3)}*********${localPart.slice(-2)}`;
    return `${maskedLocalPart}@${domain}`;
  };

  const openDeleteModal = () => {
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal without confirming
  };

  const confirmDelete = () => {
    setIsModalOpen(false); // Close the modal and trigger account deletion
    handleDeleteAccount();
  };

  return (
    <div className="container mx-auto pt-36">
      <h1 className="text-2xl font-bold text-center mb-6">MANAGE MY ACCOUNT</h1>

      <div className="bg-gray-100 p-4 mb-4">
        <p className="text-sm font-medium">
          EMAIL<span className="text-red-500">+{points} Points</span>
        </p>
        <p className="text-sm font-light">{maskEmail(userData.email)}</p>
        <div className="mt-4 flex space-x-2">
          <button className="bg-gray-200 px-4 py-2 text-sm font-medium" onClick={handleUpdateEmail}>
            CHANGE
          </button>

          {openButton && (
            <div className="mt-6 w-full">
              <p className="text-sm font-medium mb-2">Enter New Email</p>
              <form onSubmit={handleEmailUpdate} className="flex items-center space-x-4">
                <input
                  type="email"
                  placeholder="Enter new email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                  required
                />
                <button type="submit" className="bg-gray-200 px-4 py-2 text-sm font-medium">
                  UPDATE
                </button>
                <button type="submit" className="bg-red-500 px-4 py-2 text-sm font-medium" onClick={() => setOpenButton(false)}>
                  CANCEL
                </button>
              </form>
              {emailUpdated && <p className="text-green-600 mt-2">Email updated successfully</p>}
              {emailError && <p className="text-red-600 mt-2">{emailError}</p>}
            </div>
          )}

          <button className="bg-gray-400 text-white px-4 py-2 text-sm font-medium cursor-not-allowed">
            ALREADY VERIFIED
          </button>
        </div>
      </div>

      {/* Password */}
      <div className="bg-gray-100 p-4 mb-4">
        <p className="text-sm font-medium">Change Password</p>
        {!showPasswordForm && (
          <div>
            <p className="text-xs font-light mb-2">********</p>
            <button
              className="bg-gray-200 px-4 py-2 text-sm font-medium"
              onClick={() => setShowPasswordForm(true)}
            >
              UPDATE PASSWORD
            </button>
          </div>
        )}

        {showPasswordForm && (
          <form onSubmit={handlePasswordUpdate} className="mt-4 space-y-2">
            <input
              type="password"
              placeholder="Enter old password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
              required
            />
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
              required
            />
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
              required
            />
            <button type="submit" className="bg-gray-200 px-4 py-2 text-sm font-medium">
              UPDATE PASSWORD
            </button>
            <button type="submit" className="bg-red-500 px-4 py-2 text-sm font-medium ml-5" onClick={() => setShowPasswordForm(false)}>
              CANCEL
            </button>
          </form>
        )}

        {passwordUpdated && <p className="text-green-600 mt-2">Password updated successfully</p>}
        {passwordError && <p className="text-red-600 mt-2">{passwordError}</p>}
      </div>

      {/* Delete Account */}
      <div className="bg-gray-100 p-4 mb-4 flex justify-between">
        <div>
          <p className="text-sm font-medium">Delete Account</p>
          <p className="text-xs font-light">NOTE: THE ACCOUNT CANNOT BE RECOVERED ONCE DELETED.</p>
        </div>
        <button
          onClick={openDeleteModal}
          className="bg-red-600 text-white px-4 py-2 text-sm font-medium"
        >
          DELETE ACCOUNT
        </button>
      </div>

      {/* Modal for Delete Confirmation */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmDelete}
      />
      {/* Download Information */}
      <div className="bg-gray-100 p-4">
        <p className="text-sm font-medium">Download Your Information</p>
        <p className="text-xs font-light mb-2">
          To request a copy of your personal data, please fill out the form below. To ensure the security of your data, we will verify your identity based on the information you provide below and the information in our systems. If we need additional information for verification purposes, we will contact you.
        </p>
      </div>
    </div>
  );
};

export default AccountManagement;
