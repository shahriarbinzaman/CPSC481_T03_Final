import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { UserSelectionContext } from "../context";
import { useContext } from "react";

const EnjoyMovie = () => {
  const { adultTickets, childTickets } = useContext(UserSelectionContext);
  const totalTickets = adultTickets + childTickets;
  console.log("Total tickets:", totalTickets);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="d-flex flex-column vh-100" style={{ textAlign: "center" }}>
      <Logo className="logo" />

      {/* Centered Content */}
      <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
        <h1 style={{ marginBottom: "40px" }}>
          Payment successful. Enjoy your movie!
        </h1>
        <div
          className="d-flex"
          style={{ justifyContent: "center", gap: "40px" }}
        >
          {totalTickets !== 0 ? (
            <>
              <Button variant="primary" size="lg" onClick={handleClick}>
                Print Ticket
              </Button>
              <Button variant="primary" size="lg" onClick={handleClick}>
                Print Ticket + Receipt
              </Button>
            </>
          ) : (
            <Button variant="primary" size="lg" onClick={handleClick}>
              Print Receipt
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnjoyMovie;
