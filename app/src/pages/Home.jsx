import React, { useState } from "react";
import Logo from "../components/Logo";
import MovieCarousel from "../components/MovieCarousel";
import { Button } from "react-bootstrap";
import { FaUserCircle, FaSearch } from "react-icons/fa";
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
    <div className="home-container d-flex flex-column vh-100">
      <div
        className="header d-flex justify-content-between align-items-center px-3"
        style={{ height: "60px" }}
      >
        <div>
          {currentUser ? (
            <>
              <h5 className="m-0">Welcome, {currentUser.fullName}</h5>
              <p className="m-0">Credits: {currentUser.credits}</p>
            </>
          ) : (
            <h5 className="m-0">Welcome, Guest</h5>
          )}
        </div>
      </div>
      <div className="d-flex justify-content-center mt-2">
        <Logo className="logo" />
      </div>
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

      <LoginPopup show={showLogin} handleClose={() => setShowLogin(false)} />
    </div>
  );
};

export default Home;
