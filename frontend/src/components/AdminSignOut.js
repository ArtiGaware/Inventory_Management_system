// src/components/AdminSignOut.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminSignOut() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear any admin-related state or storage if needed
    alert('Admin signed out successfully');
    navigate('/admin-login');
  }, [navigate]);

  return null;
}

export default AdminSignOut;
