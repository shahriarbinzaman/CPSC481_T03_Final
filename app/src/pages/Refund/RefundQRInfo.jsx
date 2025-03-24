import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Logo from "../../components/Logo";
import RefundConfirmationModal from "../../components/RefundConfirmationModal"; // Import the modal component
import Navbar from "../../components/Navbar";

const RefundTicketInfo = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleRefundRequest = () => {
    setShowModal(true);
  };

  const handleConfirmRefund = () => {
    navigate("/"); //navigate to the homepage
  };

  return (
    <div className="d-flex flex-column vh-100 overflow-hidden">
      <Logo className="logo" />
      <Navbar />

      {/* Refund Info */}
      <div className="d-flex flex-column align-items-center justify-content-center flex-grow-1">
        <div className="info-box d-flex flex-column p-4">
          <div className="d-flex justify-content-start align-items-center">
            <h2
              className="fw-bold"
              style={{ minWidth: "280px", textAlign: "left" }}
            >
              Movie:
            </h2>
            <h2 className="justify-content-start">Comedy Night</h2>
          </div>
          <div className="d-flex justify-content-start align-items-center">
            <h2
              className="fw-bold"
              style={{ minWidth: "280px", textAlign: "left" }}
            >
              Showtime:
            </h2>
            <h2 className="justify-content-start">Feb 12, 8:00 pm</h2>
          </div>
          <div className="d-flex justify-content-start align-items-center">
            <h2
              className="fw-bold"
              style={{ minWidth: "280px", textAlign: "left" }}
            >
              Seat:
            </h2>
            <h2 className="justify-content-start">D5</h2>
          </div>
          <div className="d-flex justify-content-start align-items-center">
            <h2
              className="fw-bold"
              style={{ minWidth: "280px", textAlign: "left" }}
            >
              Refund Amount:
            </h2>
            <h2 className="justify-content-start">$13.00</h2>
          </div>
        </div>

        {/* Request Refund Button */}
        <div className="d-flex">
          <Button
            variant="primary"
            className="m-3 d-flex align-items-center btn-lg"
            onClick={handleRefundRequest}
          >
            Request Refund
          </Button>
        </div>
      </div>

      {/* Refund Confirmation Modal */}
      <RefundConfirmationModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onConfirm={handleConfirmRefund}
        agreed={agreed}
        setAgreed={setAgreed}
      />
    </div>
  );
};

export default RefundTicketInfo;
