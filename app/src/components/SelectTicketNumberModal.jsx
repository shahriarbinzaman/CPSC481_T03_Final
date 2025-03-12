import { Modal, Button } from "react-bootstrap";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { UserSelectionContext } from "../context";
import NumberStepper from "./NumberStepper";

const SeletctTicketNumberModal = ({ show, handleClose }) => {
  const { setChildTickets, setAdultTickets, movieId, format, time, date } =
    useContext(UserSelectionContext);
  const [childTicketNumber, setChildTicketsNumber] = useState(0);
  const [adultTicketNumber, setAdultTicketsNumber] = useState(0);

  const navigate = useNavigate();

  const handleConfirm = () => {
    setChildTickets(childTicketNumber);
    setAdultTickets(adultTicketNumber);
    navigate(`/movie/${movieId}/seat-selection`);
  };
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header>
        <Modal.Title>Select Ticket Numbers</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-between align-items-center">
          <label>Child Tickets:</label>
          <NumberStepper
            value={childTicketNumber}
            onChange={setChildTicketsNumber}
          />
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <label>Adult Tickets:</label>
          <NumberStepper
            value={adultTicketNumber}
            onChange={setAdultTicketsNumber}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose} variant="secondary">
          Close
        </Button>
        <Button onClick={handleConfirm}>Confirm</Button>
      </Modal.Footer>
    </Modal>
  );
};
export default SeletctTicketNumberModal;
