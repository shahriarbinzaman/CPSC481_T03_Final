import Logo from "../components/Logo";
import Movies from "../components/Movies";
import { Button } from "react-bootstrap";
import { FaUserCircle, FaSearch } from "react-icons/fa";
import { MdRedeem } from "react-icons/md";
import { IoFastFood, IoTicket } from "react-icons/io5";
import { RiRefund2Line } from "react-icons/ri";

const Home = () => {
  return (
    <>
      <Logo className="logo" />
      <Movies />
      <div className="options d-flex justify-content-around">
        <Button
          variant="primary"
          className="d-flex flex-column align-items-center"
        >
          <FaUserCircle className="me-2" />
          Login
        </Button>
        <Button
          variant="primary"
          className="d-flex flex-column align-items-center"
        >
          <MdRedeem className="me-2" />
          Redeem Movie
        </Button>
        <Button
          variant="primary"
          className="d-flex flex-column align-items-center"
        >
          <IoFastFood />
          Purchase Snacks
        </Button>
        <Button
          variant="primary"
          className="d-flex flex-column align-items-center"
        >
          <FaSearch className="me-2" />
          Search For Movies
        </Button>
        <Button
          variant="primary"
          className="d-flex flex-column align-items-center"
        >
          <RiRefund2Line className="me-2" />
          Refund a Ticket
        </Button>
        <Button
          variant="primary"
          className="d-flex flex-column align-items-center"
        >
          <IoTicket className="me-2" />
          Pickup Tickets
        </Button>
      </div>
    </>
  );
};

export default Home;
