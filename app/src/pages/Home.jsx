import Logo from "../components/Logo";
import MovieCarousel from "../components/MovieCarousel";
import { Button } from "react-bootstrap";
import { FaUserCircle, FaSearch } from "react-icons/fa";
import { MdRedeem } from "react-icons/md";
import { IoFastFood } from "react-icons/io5";
import { RiRefund2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <Logo className="logo" />
      <MovieCarousel />
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
          onClick={() => navigate("/refund")}
        >
          <RiRefund2Line className="me-2" />
          Refund a Ticket
        </Button>
      </div>
    </>
  );
};

export default Home;
