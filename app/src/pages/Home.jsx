import React, { useState } from "react";
import Logo from "../components/Logo";
import MovieCarousel from "../components/MovieCarousel";
import { Button } from "react-bootstrap";
import { FaUserCircle, FaSearch } from "react-icons/fa";
import { MdRedeem } from "react-icons/md";
import { IoFastFood } from "react-icons/io5";
import { RiRefund2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

import LoginPopup from "../components/LoginPopup/LoginPopup";
import { useUser } from "../context/UserContext";

export const Home = () => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const { currentUser } = useUser();

  return (
    <>
      <div className="header d-flex justify-content-between p-3">
        <div>
          {currentUser ? (
            <>
              <h5>Welcome, {currentUser.fullName}</h5>
              <p>Credits: {currentUser.credits}</p>
            </>
          ) : (
            <h5>Welcome, Guest</h5>
          )}
        </div>
      </div>
      <Logo className="logo" />
      <MovieCarousel />
      <div className="options d-flex justify-content-around">
        <Button
          variant="primary"
          className="d-flex flex-column align-items-center"
          onClick={() => setShowLogin(true)}
        >
          <FaUserCircle className="me-2" />
          Login
        </Button>
        <Button
          variant="primary"
          className="d-flex flex-column align-items-center"
        >
          <MdRedeem className="me-2" />
          Redeem Movie
        </Button>
        <Button
          variant="primary"
          className="d-flex flex-column align-items-center"
          onClick={() => navigate("/snack")}
        >
          <IoFastFood />
          Purchase Snacks
        </Button>
        <Button
          variant="primary"
          className="d-flex flex-column align-items-center"
          onClick={() => navigate("/movie-schedule")}
        >
          <FaSearch className="me-2" />
          Search For Movies
        </Button>
        <Button
          variant="primary"
          className="d-flex flex-column align-items-center"
          onClick={() => navigate("/refund")}
        >
          <RiRefund2Line className="me-2" />
          Refund a Ticket
        </Button>
      </div>

      {/* Login Popup */}
      <LoginPopup show={showLogin} handleClose={() => setShowLogin(false)} />
    </>
  );
};

export default Home;
