import React from "react";
import { Button } from "react-bootstrap";
import { FaArrowLeft, FaHome, FaArrowDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/Logo";
import { useEffect } from "react";

const RefundTicket = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleScannerInput = (event) => {
      if (event.key === "Enter") {
        navigate("/refund/info"); // Navigate when "Enter" is pressed after scanning
      }
    };
    window.addEventListener("keydown", handleScannerInput);
    return () => window.removeEventListener("keydown", handleScannerInput);
  }, [navigate]);

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <div className="d-flex flex-column vh-100 overflow-hidden">
      {/* Back Button (Top Left) */}
      <Button
        variant="primary"
        className="position-absolute top-0 start-0 m-3 d-flex align-items-center btn-lg"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft size={24} />
      </Button>

      {/* Logo (Centered at the Top) */}
      <div className="d-flex justify-content-center mt-3">
        <Logo className="logo" />
      </div>

      {/* Remaining Space Container (Flex-Grow-1) */}
      <div className="d-flex flex-column align-items-center justify-content-center flex-grow-1">
        <h1 className="text-center m-0 p-0">
          Scan ticket barcode/QR using scanner below
        </h1>

        <div className="d-flex justify-content-center mt-4">
          <FaArrowDown style={{ fontSize: "5rem", color: "#fff" }} />
        </div>
      </div>

      {/* Home Button (Bottom Left) */}
      <div className="d-flex">
        <Button
          variant="primary"
          className="m-3 d-flex align-items-center btn-lg align-self-start"
          onClick={handleHomeClick}
        >
          <FaHome size={24} />
        </Button>
      </div>
    </div>
  );
};

export default RefundTicket;
