import { useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { UserSelectionContext } from "../context";
import Logo from "../components/Logo";
import MovieMetaData from "../assets/movieMetaData.json";
import CustomSeatPicker from "../components/CustomSeatPicker";
import "./SeatSelection.css";

export const SeatSelection = () => {
  const navigate = useNavigate();
  const { date, showtime } = useContext(UserSelectionContext);

  // using router id instead of context because context goes away on refresh or time out
  const movieIdFromParam = useParams().id;
  const movieDetail = MovieMetaData.movies.find(
    (movie) => movie.id === movieIdFromParam
  );

  return (
    <>
      <Logo />
      <div className="page-container">
        <div className="d-flex m-1">
          <ArrowBackOutlinedIcon
            fontSize="large"
            onClick={() => navigate(-1)}
          />

          <img
            src={require(`../assets/movies/${movieDetail.imagePath}`)}
            alt={movieDetail.title}
            className="movie-img flex-grow-3"
          />

          <div className="movie-detail-content">
            <h1 className="mt-2 mb-2">{movieDetail.title}</h1>
            <h4>{`Showtime: ${date}, ${showtime}`}</h4>
          </div>

          <Link to="/">
            <HomeOutlinedIcon fontSize="large" />
          </Link>
        </div>
        <CustomSeatPicker />
      </div>
    </>
  );
};
