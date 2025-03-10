import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import Logo from '../components/Logo';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="vh-100" style={{ position: 'relative', textAlign: 'center', paddingTop: '120px' }}>
      {/* Fixed Logo Header */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          padding: '10px 0',
          backgroundColor: 'transparent',
          zIndex: 1000,
        }}
      >
        <Logo className="logo" />
      </div>

      {/* Main Content */}
      <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100%' }}>
        <h1>Sorry something went wrong :(</h1>
        <p>Please seek an attendant!</p>
        <Button variant="primary" onClick={() => navigate('/')}>
          <FaHome size={60} />
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;