import React, { useContext, useState } from "react";
import { Button, Alert, NavbarBrand } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import movieData from "../assets/movieMetaData.json";
import { UserSelectionContext } from "../context/UserSelectionContext";
import { useUser } from "../context/UserContext";
import { snacksData } from "../components/Snacks";
import Navbar from "../components/Navbar";

const SelectPayment = () => {
  const navigate = useNavigate();
  const { movieId, showtime, seats, snacks, date } =
    useContext(UserSelectionContext);
  const { currentUser, setCurrentUser } = useUser();

  const movie = movieData.movies.find((m) => m.id === movieId);

  const ticketPricePerSeat = 20;
  const totalMoviePrice = seats.length * ticketPricePerSeat;

  const calculateSnackTotal = () => {
    let total = 0;
    for (const category in snacks) {
      for (const item in snacks[category]) {
        for (const size in snacks[category][item]) {
          const quantity = snacks[category][item][size];
          const price = snacksData[category].find((i) => i.name === item).price[
            size
          ];
          total += price * quantity;
        }
      }
    }
    return total;
  };

  const totalSnackPrice = calculateSnackTotal();
  const [redeemed, setRedeemed] = useState(false);

  const canRedeemCredits = currentUser && currentUser.credits >= 10;
  const discountedMoviePrice = redeemed
    ? totalMoviePrice - ticketPricePerSeat
    : totalMoviePrice;
  const subtotal = discountedMoviePrice + totalSnackPrice;
  const taxes = subtotal * 0.05;
  const grandTotal = subtotal + taxes;

  const handleRedeemCredits = () => {
    if (canRedeemCredits) {
      // TODO: This changes the user's credits in the context, but does not persist it to the JSON.
      setCurrentUser((prevUser) => ({
        ...prevUser,
        credits: prevUser.credits - 10, // Deduct 10 credits
      }));
      setRedeemed(true);
    }
  };

  return (
    <div
      className="d-flex flex-column vh-100 overflow-auto"
      style={{ position: "relative" }}
    >
      <Logo className="logo" />
      <Navbar />

      {/* Main Content */}
      <div className="container">
        <h2 className="text-center mb-4">PAYMENT OPTIONS</h2>

        <div className="row">
          {/* Left Column - Order Summary */}
          <div className="col-md-6">
            <div className="order-summary p-3 border rounded bg-dark text-white">
              <h3>Order Summary</h3>

              {/* Movie Order Summary (Only if seats are selected) */}
              {seats.length > 0 && movie && (
                <div>
                  <div className="d-flex align-items-center">
                    <img
                      src={require(`../assets/movies/${movie.imagePath}`)}
                      alt={`${movie.title} Poster`}
                      style={{
                        width: "auto",
                        height: "100px",
                        marginRight: "15px",
                      }}
                    />
                    <span>
                      <strong>{movie.title}</strong>, {date}, {showtime}
                    </span>
                  </div>

                  {/* Individual Ticket Breakdown */}
                  <h5>Tickets:</h5>
                  {seats.map((seat, index) => (
                    <p key={index}>
                      Seat {seat} -{" "}
                      {redeemed && index === 0 ? (
                        <span
                          style={{
                            textDecoration: "line-through",
                            color: "red",
                          }}
                        >
                          ${ticketPricePerSeat.toFixed(2)}
                        </span>
                      ) : (
                        `$${ticketPricePerSeat.toFixed(2)}`
                      )}
                    </p>
                  ))}

                  <h5>
                    <strong>Total Ticket Price:</strong>$
                    {redeemed
                      ? (totalMoviePrice - ticketPricePerSeat).toFixed(2)
                      : totalMoviePrice.toFixed(2)}
                  </h5>
                  {redeemed && (
                    <h5 style={{ color: "green" }}>
                      - Redeemed Ticket Discount: $
                      {ticketPricePerSeat.toFixed(2)}
                    </h5>
                  )}
                </div>
              )}

              {/* Snack Order Summary (Only if snacks are added) */}
              {totalSnackPrice > 0 && (
                <div className="mt-3">
                  <h4>Snacks</h4>
                  {Object.keys(snacks).map((category) =>
                    Object.keys(snacks[category]).map((item) =>
                      Object.keys(snacks[category][item]).map((size) => {
                        const quantity = snacks[category][item][size];
                        const price = snacksData[category].find(
                          (i) => i.name === item
                        ).price[size];
                        return (
                          <p key={`${item}-${size}`}>
                            {item} ({size}) - {quantity} x ${price.toFixed(2)} =
                            ${(price * quantity).toFixed(2)}
                          </p>
                        );
                      })
                    )
                  )}
                  <h5>
                    <strong>Total Snack Price:</strong> $
                    {totalSnackPrice.toFixed(2)}
                  </h5>
                </div>
              )}

              {/* Final Summary */}
              <div className="mt-3 border-top pt-3">
                <h5>Subtotal: ${subtotal.toFixed(2)}</h5>
                <h5>Taxes (5%): ${taxes.toFixed(2)}</h5>
                <h4>
                  <strong>Total: ${grandTotal.toFixed(2)}</strong>
                </h4>
              </div>
            </div>
          </div>

          {/* Right Column - Payment Options */}
          <div className="col-md-6 ">
            <div className="payment-options p-3 border rounded">
              <h3>Choose Payment Option</h3>

              {/* Redeem Credits Option (Only if logged in and has 10 credits) */}
              {currentUser && seats.length > 0 && canRedeemCredits && (
                <div className="mt-3">
                  <Alert variant="info">
                    You have {currentUser.credits} credits. Redeem 10 credits
                    for a free ticket?
                  </Alert>
                  <Button
                    variant="success"
                    onClick={handleRedeemCredits}
                    disabled={redeemed}
                    className="w-100 mb-3"
                  >
                    {redeemed ? "Credits Redeemed!" : "Redeem 10 Credits"}
                  </Button>
                </div>
              )}

              {/* Payment Buttons */}
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate("/pin-pad")}
                className="w-100 mb-3"
              >
                Pay with Debit
              </Button>
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate("/pin-pad")}
                className="w-100"
              >
                Pay with Credit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectPayment;
