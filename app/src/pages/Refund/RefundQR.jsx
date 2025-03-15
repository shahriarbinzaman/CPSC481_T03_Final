import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/Logo";
import { useEffect } from "react";
import Navbar from "../../components/Navbar";
import { FaArrowDown } from "react-icons/fa";

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



  return (
    <div className="d-flex flex-column vh-100 overflow-hidden">
      <Logo className="logo" />
      <Navbar />

      {/* Remaining Space Container (Flex-Grow-1) */}
      <div className="d-flex flex-column align-items-center justify-content-center flex-grow-1">
        <h1 className="text-center m-0 p-0">
          Scan ticket barcode/QR using scanner below
        </h1>

        <div className="d-flex justify-content-center mt-4">
          <FaArrowDown style={{ fontSize: "5rem", color: "#fff" }} />
        </div>
      </div>
    </div>
  );
};

export default RefundTicket;
