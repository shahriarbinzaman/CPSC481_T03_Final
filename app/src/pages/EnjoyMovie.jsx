import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';

const EnjoyMovie = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <div className="d-flex flex-column vh-100" style={{ padding: '20px', textAlign: 'center' }}>
      {/* Logo at the top */}
      <div className="d-flex justify-content-center mt-3">
        <Logo className="logo" />
      </div>

      {/* Centered Content */}
      <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
        <h1 style={{ marginBottom: '40px' }}>
          Payment successful. Enjoy your movie!
        </h1>
        <div className="d-flex" style={{ justifyContent: 'center', gap: '30px' }}>
          <Button
            variant="primary"
            size="lg"
            onClick={handleClick}
            style={{ width: '150px', height: '150px', borderRadius: '0' }}
          >
            Print Ticket
          </Button>
          <Button
            variant="primary"
            size="lg"
            onClick={handleClick}
            style={{ width: '150px', height: '150px', borderRadius: '0' }}
          >
            Print Ticket + Receipt
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EnjoyMovie;