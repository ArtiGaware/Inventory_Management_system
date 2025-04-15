// src/components/UserSignOut.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function UserSignOut() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear any user-related state or storage if needed
    alert('User signed out successfully');
    navigate('/user-login');
  }, [navigate]);

  return null; // or a loading spinner if you want
}

export default UserSignOut;
