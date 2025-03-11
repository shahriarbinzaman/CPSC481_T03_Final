import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <div className="d-flex justify-content-between w-100">
        <ArrowBackOutlinedIcon fontSize="large" onClick={() => navigate(-1)} />

        <Link to="/">
          <HomeOutlinedIcon fontSize="large" />
        </Link>
      </div>
    </nav>
  );
};
