import { useContext } from "react";
import { Button, Nav } from "react-bootstrap";
import { FaArrowLeft, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import Logo from "../components/Logo";
import movieData from "../assets/movieMetaData.json";
import { UserSelectionContext } from "../context";
import Navbar from "../components/Navbar";

const OrderSummary = () => {
  const navigate = useNavigate();

  const { movieId, showtime, seats, date, adultTickets, childTickets, format } =
    useContext(UserSelectionContext);

  const subtotal = adultTickets * 20 + childTickets * 10;
  const taxes = subtotal * 0.05;
  const totalPrice = subtotal + taxes;

  // Retrieve the movie details based on the movieId.
  const movie = movieData.movies.find((m) => m.id === movieId);

  return (
    <div
      className="d-flex flex-column vh-100 overflow-auto"
      style={{ position: "relative" }}
    >
      <Logo className="logo" />
      <Navbar />
      <h1>ORDER SUMMARY</h1>

      {/* Movie Details */}
      {movie ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <img
            src={require(`../assets/movies/${movie.imagePath}`)}
            alt={movie.title}
            className="movie-info flex-grow-3 ml-5"
          />

          <div className="movie-detail-content">
            <h2 className="mt-2 mb-2">{movie.title}</h2>
            <span>
              <strong>Showtime:</strong> {date}
              <br />
              <strong>Time:</strong> {showtime}
              <br />
              <strong>Fromat</strong> {format}
              <br />
              <strong>Seats:</strong> {seats.join(", ")}
            </span>
          </div>
        </div>
      ) : (
        <p>Movie not found.</p>
      )}

      {/* Bottom Section: Price Breakdown & Action Buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "right",
          width: "100%",
          maxWidth: "600px",
          marginTop: "30px",
        }}
        className="ml-auto"
      >
        {/* Price Breakdown (Bottom Left) */}
        <div style={{ textAlign: "left" }}>
          <p style={{ fontSize: "1.5rem", margin: 0 }}>
            <strong>Subtotal:</strong> ${subtotal}
          </p>
          <p style={{ fontSize: "1.5rem", margin: 0 }}>
            <strong>Taxes:</strong> ${taxes}
          </p>
          <p style={{ fontSize: "2rem", margin: 0 }}>
            <strong>Total:</strong> ${totalPrice}
          </p>
        </div>

        {/* Action Buttons (Bottom Right) */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "250px",
            alignItems: "flex-end",
          }}
          className="ml-auto"
        >
          <Button
            variant="primary"
            className="mr-3"
            size="lg"
            onClick={() => navigate("/snack")}
            style={{
              width: "75%",
              textAlign: "center",
            }}
          >
            Add Snacks
          </Button>
          <Button
            variant="primary"
            className="mr-3"
            size="lg"
            onClick={() => navigate("/select-payment")}
            style={{
              width: "75%",
              textAlign: "center",
            }}
          >
            Proceed to Payment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
