import { useState, useContext } from "react";
import WeekendIcon from "@mui/icons-material/Weekend";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "./CustomSeatPicker.css";
import { UserSelectionContext } from "../contexts";

const Legend = () => {
  return (
    <div className="legend mb-3 d-flex flex-column">
      <h5>Legend</h5>
      <div className="unavailable d-flex align-items-center">
        <WeekendIcon className="seat unavailable" />
        <span>Unavailable</span>
      </div>

      <div className="available d-flex align-items-center">
        <WeekendIcon className="seat" />
        <span>Available</span>
      </div>

      <div className="selected d-flex align-items-center">
        <WeekendIcon className="seat selected" />
        <span>User Selected</span>
      </div>
    </div>
  );
};

const CustomSeatPicker = ({ rows = 7, cols = 10 }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const unavailaleSeats = ["F6", "F7", "F8"];
  const { setSeats, movieId } = useContext(UserSelectionContext);
  const navigate = useNavigate();

  const toggleSeat = (seatId) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((s) => s !== seatId)
        : [...prev, seatId]
    );
  };

  const handleConfirm = () => {
    setSeats(selectedSeats);
    navigate(`/movie/${movieId}/order-summary`);
  };

  return (
    <div className="d-flex">
      <div className="d-flex flex-column screen-seat">
        <div className="screen-container mt-5">
          <svg
            width="100%"
            height="60px"
            viewBox="0 0 349 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.4">
              <path
                fill="#D9EBFF"
                d="M35.69 24.786 6 15.59c116.287-11.226 217.251-11.418 336 0l-29.168 9.19c-134.756-11.749-244.85-3.685-277.143.007"
                opacity="0.4"
              />
              <path
                fill="#545557"
                d="M6 10.298c134.009-11.473 205.755-10.647 336 0v5.291C211.139 4.506 137.586 4.387 6 15.59z"
              />
            </g>
            <text
              x="174.5"
              y="27"
              dominantBaseline="middle"
              textAnchor="middle"
              fontSize="14px"
              fontWeight="bold"
              fill="#bad3ee"
            >
              SCREEN
            </text>
          </svg>
        </div>
        <div className="seat-picker-container">
          {[...Array(rows)].map((_, rowIndex) => (
            <div
              key={rowIndex}
              className="seat-row d-flex justify-content-center"
            >
              <span className="row-label p-3">
                {String.fromCharCode(65 + rowIndex)}
              </span>
              {[...Array(cols)].map((_, colIndex) => {
                const seatId = `${String.fromCharCode(65 + rowIndex)}${colIndex + 1}`;
                const selected = selectedSeats.includes(seatId);
                const unavailable = unavailaleSeats.includes(seatId);

                return (
                  <Button
                    key={seatId}
                    className={`seat ${
                      selected ? "selected" : ""
                    } ${unavailable ? "unavailable" : ""} d-flex flex-column align-items-center justify-content-center ${
                      colIndex === 4 ? "mr-5" : ""
                    }`}
                    onClick={() => toggleSeat(seatId)}
                    variant="outline-primary"
                  >
                    <WeekendIcon />
                    <span>{colIndex + 1}</span>
                  </Button>
                );
              })}
              <span className="row-label p-3">
                {String.fromCharCode(65 + rowIndex)}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="additional-info d-flex flex-column">
        <Legend />
        <div className="selected-info">
          <strong>Selected Seats: </strong>
          <div className="selected-seats">
            <strong>{selectedSeats.join(", ") || ""}</strong>
          </div>
          <Button
            variant="outline-secondary"
            className={`m-2 ${selectedSeats.length === 0 ? "inactive" : ""}`}
            onClick={() => setSelectedSeats([])}
          >
            Reset All
          </Button>
        </div>
        <Button className="confirm mt-auto" onClick={handleConfirm}>
          Confirm Selection
        </Button>
      </div>
    </div>
  );
};

export default CustomSeatPicker;
