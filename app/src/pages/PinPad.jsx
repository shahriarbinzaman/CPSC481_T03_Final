import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { FaArrowLeft, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";

const PinPad = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyInput = (event) => {
      if (event.key === "Enter") {
        navigate("/print");
      } else if (event.key === "Backspace") {
        navigate("/error");
      }
    };

    window.addEventListener("keydown", handleKeyInput);
    return () => window.removeEventListener("keydown", handleKeyInput);
  }, [navigate]);

  return (
    <div className="d-flex flex-column vh-100 overflow-hidden" style={{ position: "relative" }}>
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

      {/* Main Content: Instruction Text */}
      <div className="d-flex flex-column flex-grow-1 justify-content-center align-items-center">
        <h1 className="text-center" style={{ fontSize: "2.5rem", margin: "0 20px" }}>
          Please follow instructions on the pin pad.
        </h1>
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

export default PinPad;
