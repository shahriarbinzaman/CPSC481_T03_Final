import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { FaTimes, FaIdCard } from "react-icons/fa";
import { useUser } from "../../context/UserContext";
import mockUsers from "../../data/MockUsers";

const LoginPopup = ({ show, handleClose }) => {
  const [membershipID, setMembershipID] = useState("");
  const [error, setError] = useState("");
  const { setCurrentUser } = useUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    const foundUser = mockUsers.find(
      (user) => user.membershipID === membershipID
    );

    if (foundUser) {
      setCurrentUser(foundUser);
      setError("");
      handleClose();
    } else {
      setError("Invalid membership ID. Please try again.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header>
        <Modal.Title>Scan or Enter Membership ID {<FaIdCard />}</Modal.Title>
        <FaTimes
          className="close-icon"
          onClick={handleClose}
          style={{ cursor: "pointer" }}
        />
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <p>Please scan your membership card or enter your ID manually.</p>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Membership ID</Form.Label>
            <Form.Control
              type="text"
              value={membershipID}
              onChange={(e) => setMembershipID(e.target.value)}
              placeholder="Enter Membership ID"
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3" size="lg">
            Login
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginPopup;
