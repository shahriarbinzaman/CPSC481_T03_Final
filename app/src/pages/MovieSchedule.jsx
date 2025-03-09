import React, { useState, useMemo, useRef } from 'react';
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

  // Filter events: only keep events that are upcoming and that match the search query.
  const filteredEvents = useMemo(() => {
    let result = events.filter((event) => event.timeValue >= currentMinutes);
    if (searchQuery) {
      result = result.filter((event) =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return result;
  }, [searchQuery, events, currentMinutes]);

  // --- Drag-to-Scroll Functionality ---
  const scrollContainerRef = useRef(null);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0, scrollTop: 0 });

  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    dragStartRef.current = {
      x: e.pageX,
      y: e.pageY,
      scrollTop: scrollContainerRef.current.scrollTop,
    };
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    e.preventDefault();
    const deltaY = e.pageY - dragStartRef.current.y;
    scrollContainerRef.current.scrollTop = dragStartRef.current.scrollTop - deltaY;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleMouseLeave = () => {
    isDraggingRef.current = false;
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    isDraggingRef.current = true;
    dragStartRef.current = {
      x: touch.pageX,
      y: touch.pageY,
      scrollTop: scrollContainerRef.current.scrollTop,
    };
  };

  const handleTouchMove = (e) => {
    if (!isDraggingRef.current) return;
    const touch = e.touches[0];
    const deltaY = touch.pageY - dragStartRef.current.y;
    scrollContainerRef.current.scrollTop = dragStartRef.current.scrollTop - deltaY;
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  return (
    <div className="d-flex flex-column vh-100">
      {/* Back Button */}
      <Button
        variant="primary"
        className="position-absolute top-0 start-0 m-3 d-flex align-items-center btn-lg"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft size={24} />
      </Button>

      {/* Logo */}
      <div className="d-flex justify-content-center mt-3">
        <Logo className="logo" />
      </div>

      {/* Content Area */}
      <div style={{ padding: '20px', marginTop: '60px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ marginBottom: '20px', padding: '8px', width: '300px' }}
        />
        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          style={{ overflowY: 'auto', flex: 1 }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {filteredEvents.map((event, index) => (
              <li
                key={`${event.id}-${index}`}
                style={{
                  marginBottom: '20px',
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                }}
              >
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
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MovieSchedule;
