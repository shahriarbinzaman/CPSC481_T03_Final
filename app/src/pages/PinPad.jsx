import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import Navbar from "../components/Navbar";

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
    <div
      className="d-flex flex-column vh-100 overflow-hidden"
      style={{ position: "relative" }}
    >
      <Logo className="logo" />
      <Navbar />

      {/* Main Content: Instruction Text */}
      <div className="d-flex flex-column flex-grow-1 justify-content-center align-items-center">
        <h1
          className="text-center"
          style={{ fontSize: "2.5rem", margin: "0 20px" }}
        >
          Please follow instructions on the pin pad.
        </h1>
      </div>
    </div>
  );
};

export default PinPad;
