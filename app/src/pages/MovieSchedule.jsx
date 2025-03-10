import React, { useState, useMemo } from 'react';
import { Button } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import movieData from '../assets/movieMetaData.json';
import Logo from '../components/Logo';

// Helper function to convert a time string (e.g., "1:30 PM") to minutes since midnight
const parseTime = (timeStr) => {
  const [time, modifier] = timeStr.split(' ');
  let [hours, minutes] = time.split(':').map(Number);
  if (modifier === 'PM' && hours !== 12) {
    hours += 12;
  }
  if (modifier === 'AM' && hours === 12) {
    hours = 0;
  }
  return hours * 60 + minutes;
};

// Simple on-screen keyboard component (permanent on-screen)
const OnScreenKeyboard = ({ onKeyClick, onBackspace, onSpace, onClear }) => {
  const keys = [
    'Q','W','E','R','T','Y','U','I','O','P',
    'A','S','D','F','G','H','J','K','L',
    'Z','X','C','V','B','N','M'
  ];

  const keyButtonStyle = {
    margin: '5px',
    padding: '12px 18px',
    fontSize: '16px',
    backgroundColor: '#f0f0f0',
    border: 'none',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    outline: 'none',
    transition: 'background-color 0.3s, transform 0.1s',
  };

  const actionButtonStyle = {
    margin: '5px',
    padding: '12px 18px',
    fontSize: '16px',
    backgroundColor: '#d0d0d0',
    border: 'none',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    outline: 'none',
    transition: 'background-color 0.3s, transform 0.1s',
  };

  const containerStyle = {
    backgroundColor: 'transparent',
    padding: '15px',
    borderRadius: '10px',
    marginTop: '10px',
    width: '100%',
    maxWidth: '600px',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={containerStyle}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {keys.map((key) => (
            <button 
              key={key}
              onClick={() => onKeyClick(key)}
              style={keyButtonStyle}
            >
              {key}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <button onClick={onSpace} style={actionButtonStyle}>
            Space
          </button>
          <button onClick={onBackspace} style={actionButtonStyle}>
            Backspace
          </button>
          <button onClick={onClear} style={actionButtonStyle}>
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};


const MovieSchedule = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Create a flat list of showtime events from the movie data.
  const events = useMemo(() => {
    let eventList = [];
    movieData.movies.forEach((movie) => {
      Object.entries(movie.showtimes).forEach(([format, times]) => {
        times.forEach((timeStr) => {
          eventList.push({
            id: movie.id,
            title: movie.title,
            imagePath: movie.imagePath,
            length: movie.length,
            genre: movie.genre,
            format,
            showtime: timeStr,
            timeValue: parseTime(timeStr),
          });
        });
      });
    });
    // Sort the events by timeValue (earliest to latest)
    eventList.sort((a, b) => a.timeValue - b.timeValue);
    return eventList;
  }, []);

  // Calculate current time (in minutes since midnight)
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  // Filter events: only keep events that are upcoming and match the search query.
  const filteredEvents = useMemo(() => {
    let result = events.filter((event) => event.timeValue >= currentMinutes);
    if (searchQuery) {
      result = result.filter((event) =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return result;
  }, [searchQuery, events, currentMinutes]);

  // Handlers for on-screen keyboard interactions
  const handleKeyboardKeyClick = (key) => {
    setSearchQuery((prev) => prev + key);
  };

  const handleKeyboardBackspace = () => {
    setSearchQuery((prev) => prev.slice(0, -1));
  };

  const handleKeyboardSpace = () => {
    setSearchQuery((prev) => prev + ' ');
  };

  const handleKeyboardClear = () => {
    setSearchQuery('');
  };

  return (
    <div className="d-flex flex-column vh-100 overflow-auto">
      {/* Back Button */}
      <Button
        variant="primary"
        className="position-absolute top-0 start-0 m-3 d-flex align-items-center btn-lg"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft size={60} />
      </Button>

      {/* Logo */}
      <div className="d-flex justify-content-center mt-3">
        <Logo className="logo" />
      </div>

      {/* Main Content Container with Horizontal Margins */}
      <div
        style={{
          padding: '20px',
          marginTop: '60px',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '1200px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}
      >
        {/* Permanent Search Bar and On-Screen Keyboard */}
        <div>
          <div className="d-flex justify-content-center" style={{ marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ padding: '12px', width: '500px', fontSize: '18px' }}
            />
          </div>
          <OnScreenKeyboard
            onKeyClick={handleKeyboardKeyClick}
            onBackspace={handleKeyboardBackspace}
            onSpace={handleKeyboardSpace}
            onClear={handleKeyboardClear}
          />
        </div>

        {/* Vertical Scrollable Container for Filtered Events */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '30px',
            marginTop: '20px'
          }}
        >
          {filteredEvents.map((event, index) => (
            <div
            key={`${event.id}-${index}`}
            style={{
              width: '600px',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}
          >
            <img
              src={require(`../assets/movies/${event.imagePath}`)}
              alt={`${event.title} Poster`}
              style={{ width: '150px', height: 'auto', marginRight: '20px' }}
            />
            <div style={{ textAlign: 'left' }}>
              <h3>{event.title}</h3>
              <p>
                <strong>Format:</strong> {event.format}
              </p>
              <p>
                <strong>Showtime:</strong> {event.showtime}
              </p>
              <p>
                <strong>Genre:</strong> {event.genre}
              </p>
              <p>
                <strong>Length:</strong> {event.length}
              </p>
            </div>
          </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieSchedule;
