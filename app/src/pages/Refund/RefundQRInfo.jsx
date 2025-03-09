import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FaArrowLeft, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/Logo";
import RefundConfirmationModal from "../../components/RefundConfirmationModal"; // Import the modal component

const RefundTicketInfo = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleRefundRequest = () => {
    setShowModal(true);
  };

  const handleConfirmRefund = () => {
    navigate("/"); //navigate to the homepage
  };

  return (
    <div className="d-flex flex-column vh-100 overflow-hidden">
      {/* Back Button */}
      <Button
        variant="primary"
        className="position-absolute top-0 start-0 m-3 d-flex align-items-center btn-lg"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft size={24} />
      </Button>

      {/* Logo */}
      <div className="d-flex justify-content-center mt-3">
        <Logo className="logo" />
      </div>

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

      {/* Home Button */}
      <div className="d-flex">
        <Button
          variant="primary"
          className="m-3 d-flex align-items-center btn-lg"
          onClick={handleHomeClick}
        >
          <FaHome size={24} />
        </Button>
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
