import React from 'react';
import { Button } from 'react-bootstrap';
import { FaArrowLeft, FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import movieData from '../assets/movieMetaData.json';

const SelectPayment = () => {
  const navigate = useNavigate();

  // Hard-coded values for testing
  const movieId = "movie1";
  const showtime = "1:30PM";
  const seats = "E10, E11";
  const totalPrice = 666;

  // Retrieve the movie details based on the movieId.
  const movie = movieData.movies.find((m) => m.id === movieId);

  return (
    <div
      className="d-flex flex-column vh-100 overflow-auto"
      style={{ position: 'relative', padding: '20px' }}
    >
      {/* Back Button (Top Left) */}
      <Button
        variant="primary"
        className="position-absolute top-0 start-0 m-3 d-flex align-items-center btn-lg"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft size={60} />
      </Button>

      {/* Logo (Centered at the Top) */}
      <div className="d-flex justify-content-center mt-3">
        <Logo className="logo" />
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-center">
        {movie ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '30px',
            }}
          >
            <img
              src={require(`../assets/movies/${movie.imagePath}`)}
              alt={`${movie.title} Poster`}
              style={{ width: '300px', height: 'auto', marginRight: '20px' }}
            />
            <div style={{ textAlign: 'left' }}>
              <h2>{movie.title}</h2>
              <p>
                <strong>Showtime:</strong> {showtime}
              </p>
              <p>
                <strong>Seats:</strong> {seats}
              </p>
            </div>
          </div>
        ) : (
          <p>Movie not found.</p>
        )}

        {/* Bottom Section: Total Price & Payment Options */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            maxWidth: '600px',
            marginTop: '30px',
          }}
        >
          {/* Total Price (Bottom Left) */}
          <div style={{ textAlign: 'left' }}>
            <p style={{ fontSize: '2rem', margin: 0 }}>
              <strong>Total Price:</strong> ${totalPrice}
            </p>
          </div>

          {/* Payment Options (Bottom Right) */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: '10px',
              width: '250px',
            }}
          >
            <h3 style={{ margin: 0, width: '100%', textAlign: 'center' }}>
              Choose your payment option:
            </h3>
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/pin-pad')}
              style={{
                width: '100%',
                padding: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              Debit
              <img
                src={require('../assets/FinantialLogos/InteracLogo.png')}
                alt="Interac Logo"
                style={{ width: '50px', height: 'auto', marginLeft: '10px' }}
              />
            </Button>
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/pin-pad')}
              style={{
                width: '100%',
                padding: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              Credit
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <img
                  src={require('../assets/FinantialLogos/MastercardLogo.png')}
                  alt="Mastercard Logo"
                  style={{ width: '50px', height: 'auto' }}
                />
                <img
                  src={require('../assets/FinantialLogos/VisaLogo.png')}
                  alt="Visa Logo"
                  style={{ width: '50px', height: 'auto' }}
                />
              </div>
            </Button>
          </div>
        </div>
      </div>

      {/* Home Button (Bottom Left) */}
      <div className="d-flex">
        <Button
          variant="primary"
          className="m-3 d-flex align-items-center btn-lg align-self-start"
          onClick={() => navigate('/')}
        >
          <FaHome size={60} />
        </Button>
      </div>
    </div>
  );
};

export default SelectPayment;
