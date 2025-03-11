import { useContext } from "react";
import { Button } from "react-bootstrap";
import { FaArrowLeft, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import Logo from "../components/Logo";
import movieData from "../assets/movieMetaData.json";
import { UserSelectionContext } from "../contexts";

const OrderSummary = () => {
  const navigate = useNavigate();

  const { movieId, showtime, seats } = useContext(UserSelectionContext);

  console.log(seats);
  const subtotal = seats.length * 20;
  const taxes = subtotal * 0.05;
  const totalPrice = subtotal + taxes;

  // Retrieve the movie details based on the movieId.
  const movie = movieData.movies.find((m) => m.id === movieId);

  return (
    <div
      className="d-flex flex-column vh-100 overflow-auto"
      style={{ position: "relative", padding: "20px" }}
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
        {/* Title */}
        <h1 style={{ marginBottom: "30px" }}>ORDER SUMMARY</h1>

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
              alt={`${movie.title} Poster`}
              style={{ width: "300px", height: "auto", marginRight: "20px" }}
            />
            <div style={{ textAlign: "left" }}>
              <h2>{movie.title}</h2>
              <p>
                <strong>Showtime:</strong> {showtime}
              </p>
              <p>
                <strong>Seats:</strong> {seats.join(", ")}
              </p>
            </div>
          </div>
        ) : (
          <p>Movie not found.</p>
        )}

        {/* Bottom Section: Price Breakdown & Action Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            maxWidth: "600px",
            marginTop: "30px",
          }}
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
          >
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate("/error")}
              style={{
                width: "100%",
                padding: "30px",
                textAlign: "center",
              }}
            >
              Add Snacks
            </Button>
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate("/select-payment")}
              style={{
                width: "100%",
                padding: "30px",
                textAlign: "center",
              }}
            >
              Proceed to Payment
            </Button>
          </div>
        </div>
      </div>

      {/* Home Button (Bottom Left) */}
      <div className="d-flex">
        <Button
          variant="primary"
          className="m-3 d-flex align-items-center btn-lg align-self-start"
          onClick={() => navigate("/")}
        >
          <FaHome size={60} />
        </Button>
      </div>
    </div>
  );
};

export default OrderSummary;
