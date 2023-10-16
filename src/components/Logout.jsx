import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import setInfo from './userInfo';

function Logout() {
  const navigate = useNavigate();

  // Clear the values in localStorage
  const role = ''
  const id = ''
  setInfo(role, id)
  // Use useEffect to trigger the redirect on component mount.
  useEffect(() => {
    // Perform the redirection to a new page.
    navigate('/login');
  }, [navigate]);

  return (
    <div>
      <h1>Redirecting...</h1>
    </div>
  );
}

export default Logout;
