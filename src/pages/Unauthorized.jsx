import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../store/userSlice';

const Unauthorized = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const attemptedPath = location.state?.pathname || 'the requested page';
  const userRole = user?.role || 'Guest';

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '10vh' }}>
      <h1>401 - Unauthorized</h1>
      <p>You do not have permission to view <strong>{attemptedPath}</strong>.</p>
      <p>Your current role: <strong>{userRole}</strong></p>
      <div style={{ marginTop: '20px' }}>
        <button onClick={handleGoBack} style={{ marginRight: '10px', padding: '8px 16px', cursor: 'pointer' }}>
          Go Back
        </button>
        <button onClick={handleGoHome} style={{ padding: '8px 16px', cursor: 'pointer' }}>
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
