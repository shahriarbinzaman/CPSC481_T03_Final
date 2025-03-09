import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";

const RefundConfirmationModal = ({ show, onHide, onConfirm }) => {
  const [processing, setProcessing] = useState(false);
  const [approved, setApproved] = useState(false);
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    if (processing) {
      setTimeout(() => {
        setProcessing(false);
        setApproved(true);
      }, 3000); // Simulate processing delay
    }
  }, [processing]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      backdrop="static"
      keyboard={false}
      contentClassName="bg-dark text-white border-0"
    >
      <Modal.Body className="px-4">
        {!processing && !approved ? (
          <>
            <h4 className="mb-3 text-center fw-bold">Refund Policy</h4>
            <div className="text-start fs-5">
              <ol className="ps-3">
                <li>
                  <strong>Refund Eligibility:</strong> Cancellations must be
                  made at least
                  <strong> 24 hours before showtime</strong>.
                </li>
                <li>
                  <strong>Processing Time:</strong> Refunds are processed within
                  <strong> 5-7 business days</strong> to the original payment
                  method.
                </li>
                <li>
                  <strong>Processing Fee:</strong> A{" "}
                  <strong>$2.00 processing fee</strong> may apply per refunded
                  ticket.
                </li>
                <li>
                  <strong>Non-Refundable Tickets:</strong> Tickets purchased
                  within
                  <strong> 24 hours</strong> of the event are{" "}
                  <strong>non-refundable</strong>.
                </li>
              </ol>
            </div>

            <Form.Check
              className="text-center"
              type="checkbox"
              label="I Agree"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              style={{
                transform: "scale(1.2)",
                fontSize: "1rem",
                fontWeight: "bold",
              }}
            />
          </>
        ) : null}

        {/* Processing State */}
        {processing && (
          <>
            <h3 className="fw-bold mb-3 text-center">Processing Refund...</h3>
            <div className="d-flex justify-content-center">
              <Spinner animation="border" variant="light" />
            </div>
          </>
        )}

        {/* Approved State */}
        {approved && (
          <>
            <h3 className="fw-bold mb-3 text-center">Refund Approved!</h3>
            <p className="text-center fs-5">
              Funds will be returned to your card.
            </p>
            <div className="d-flex justify-content-center">
              <Button variant="light" onClick={onConfirm}>
                Done
              </Button>
            </div>
          </>
        )}
      </Modal.Body>

      {/* Footer Buttons */}
      {!processing && !approved && (
        <Modal.Footer className="border-0 justify-content-center">
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => setProcessing(true)}
            disabled={!agreed}
          >
            Confirm Refund
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default RefundConfirmationModal;
