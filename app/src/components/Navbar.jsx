import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import { UserSelectionContext } from "../context";

export const Navbar = () => {
  const { resetUserSelection } = useContext(UserSelectionContext);
  const navigate = useNavigate();
  const [showHelp, setShowHelp] = useState(false);

  const handleShowHelp = () => setShowHelp(true);
  const handleCloseHelp = () => setShowHelp(false);

  const handleHomeClick = () => {
    resetUserSelection();
    navigate("/");
  };
  return (
    <nav className="navbar">
      <div className="d-flex justify-content-between w-100">
        <ArrowBackOutlinedIcon fontSize="large" onClick={() => navigate(-1)} />
        <div className="d-flex align-items-center">
          <HelpOutlineIcon
            fontSize="large"
            onClick={handleShowHelp}
            style={{ marginRight: "10px" }}
          />
          <div onClick={handleHomeClick} style={{ cursor: "pointer" }}>
            <HomeOutlinedIcon fontSize="large" />
          </div>
        </div>
      </div>

      <Modal show={showHelp} onHide={handleCloseHelp} centered>
        <Modal.Header>
          <Modal.Title>Assistance</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          A movie attendant is on their way to assist you.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseHelp}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </nav>
  );
};

export default Navbar;
