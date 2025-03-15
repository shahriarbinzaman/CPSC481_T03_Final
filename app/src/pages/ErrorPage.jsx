import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import Logo from "../components/Logo";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column vh-100">
      <Logo />

      {/* Centered content */}
      <div className="d-flex flex-column flex-grow-1 justify-content-center align-items-center text-center">
        <h1>Sorry, something went wrong :(</h1>
        <p>Please seek an attendant!</p>
        <Button variant="primary" onClick={() => navigate("/")}>
          <FaHome size={60} />
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
