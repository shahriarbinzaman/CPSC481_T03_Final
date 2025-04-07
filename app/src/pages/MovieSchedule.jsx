import React, { useState, useMemo } from "react";
import movieData from "../assets/movieMetaData.json";
import Logo from "../components/Logo";
import Navbar from "../components/Navbar";
import { UserSelectionContext } from "../context";
import { useContext } from "react";
import SelectTicketNumberModal from "../components/SelectTicketNumberModal";

// Helper function to convert a time string (e.g., "1:30 PM") to minutes since midnight
const parseTime = (timeStr) => {
  const [time, modifier] = timeStr.split(" ");
  let [hours, minutes] = time.split(":").map(Number);
  if (modifier === "PM" && hours !== 12) {
    hours += 12;
  }
  if (modifier === "AM" && hours === 12) {
    hours = 0;
  }
  return hours * 60 + minutes;
};

// Simple on-screen keyboard component (permanent on-screen)
const OnScreenKeyboard = ({ onKeyClick, onBackspace, onSpace, onClear }) => {
  const numberKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const topRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const middleRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const bottomRow = ["Z", "X", "C", "V", "B", "N", "M"];

  const keyButtonStyle = {
    margin: "5px",
    padding: "12px 18px",
    fontSize: "16px",
    backgroundColor: "#f0f0f0",
    border: "none",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    cursor: "pointer",
    outline: "none",
    transition: "background-color 0.3s, transform 0.1s",
  };

  const actionButtonStyle = { ...keyButtonStyle, backgroundColor: "#d0d0d0" };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        {numberKeys.map((key) => (
          <button
            key={key}
            onClick={() => onKeyClick(key)}
            style={keyButtonStyle}
          >
            {key}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {topRow.map((key) => (
          <button
            key={key}
            onClick={() => onKeyClick(key)}
            style={keyButtonStyle}
          >
            {key}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {middleRow.map((key) => (
          <button
            key={key}
            onClick={() => onKeyClick(key)}
            style={keyButtonStyle}
          >
            {key}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {bottomRow.map((key) => (
          <button
            key={key}
            onClick={() => onKeyClick(key)}
            style={keyButtonStyle}
          >
            {key}
          </button>
        ))}
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
      >
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
  );
};

const MovieSchedule = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { setMovieId, setMovieTitle, setFormat, setShowtime } =
    useContext(UserSelectionContext);
  const [openModal, setOpenModal] = useState(false);

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
    const movieMap = new Map();

    events.forEach((event) => {
      let showtimeValue = event.timeValue;
      let adjustedTime = showtimeValue;

      if (showtimeValue < currentMinutes) {
        adjustedTime += 1440;
      }

      const existing = movieMap.get(event.id);
      if (!existing || adjustedTime < existing.adjustedTime) {
        movieMap.set(event.id, { ...event, adjustedTime });
      }
    });

    let result = Array.from(movieMap.values());

    const cleanedQuery = searchQuery.trim().toLowerCase();
    if (cleanedQuery) {
      result = result.filter((event) =>
        event.title.toLowerCase().includes(cleanedQuery)
      );
    }

    result.sort((a, b) => a.adjustedTime - b.adjustedTime);

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
    setSearchQuery((prev) => prev + " ");
  };

  const handleKeyboardClear = () => {
    setSearchQuery("");
  };

  const handleMovieClick = (id, title, time, format) => {
    setShowtime(time);
    setFormat(format);
    setMovieId(id);
    setMovieTitle(title);
    setOpenModal(true);
  };

  return (
    <div
      className="d-flex flex-column vh-100 overflow-auto"
      style={{
        width: "100vw", // Prevents content shift
        overflowY: "auto",
        scrollbarWidth: "none", // Firefox
        msOverflowStyle: "none", // IE & Edge
      }}
    >
      <Logo className="logo" />
      <Navbar />

      {/* Main Content Container with Horizontal Margins */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {/* Permanent Search Bar and On-Screen Keyboard */}
        <div>
          <div
            className="d-flex justify-content-center"
            style={{ marginBottom: "10px" }}
          >
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ padding: "12px", width: "500px", fontSize: "18px" }}
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
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            marginTop: "20px",
          }}
        >
          {filteredEvents.map((event, index) => (
            <div
              key={`${event.id}-${index}`}
              style={{
                width: "600px",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                marginLeft: "auto",
                marginRight: "auto",
                cursor: "pointer",
              }}
              onClick={() =>
                handleMovieClick(
                  event.id,
                  event.title,
                  event.format,
                  event.showtime
                )
              }
            >
              <img
                src={require(`../assets/movies/${event.imagePath}`)}
                alt={`${event.title} Poster`}
                style={{ width: "150px", height: "auto", marginRight: "20px" }}
              />
              <div style={{ textAlign: "left" }}>
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

          <SelectTicketNumberModal
            show={openModal}
            handleClose={() => setOpenModal(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default MovieSchedule;
