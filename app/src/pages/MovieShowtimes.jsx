import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { useParams, useNavigate, Link } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

import Logo from "../components/Logo";
import movieMetaData from "../assets/movieMetaData.json";
import CustomDatePicker from "../components/CustomDatePicker";
import SelectTicketNumberModal from "../components/SelectTicketNumberModal";
import { UserSelectionContext } from "../context";

export const MovieShowtimes = () => {
  const movieId = useParams().id;
  const movieDetail = movieMetaData.movies.find(
    (movie) => movie.id === movieId
  );

  const [openModal, setOpenModal] = useState(false);

  const { setShowtime, setFormat } = useContext(UserSelectionContext);
  const navigate = useNavigate();

  const handleShowtimeClick = (format, time) => {
    setShowtime(time);
    setFormat(format);
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <Logo />
      <div className="d-flex flex-column">
        <div className="d-flex mb-4">
          <ArrowBackOutlinedIcon
            fontSize="large"
            onClick={() => navigate(-1)}
          />

          <img
            src={require(`../assets/movies/${movieDetail.imagePath}`)}
            alt={movieDetail.title}
            className="movie-img flex-grow-3"
          />

          <div className="d-flex flex-column  align-items-start movie-detail-content">
            <h1 className="mt-2 mb-5">{movieDetail.title}</h1>
            <h4>Length: {movieDetail.length}</h4>
            <h4>Genre: {movieDetail.genre}</h4>
          </div>

          <Link to="/">
            <HomeOutlinedIcon fontSize="large" />
          </Link>
        </div>

        <CustomDatePicker />
        <div className="format-container d-flex justify-content-around">
          {Object.entries(movieDetail.showtimes).map(
            ([key, value], index, array) => (
              <div
                key={index}
                className={`showtime-container py-4 ${
                  index !== array.length - 1 ? "center-line" : ""
                }`}
              >
                <h3>{key}</h3>
                <div className="d-flex justify-content-around gap-2">
                  {value.map((time, timeIndex) => (
                    <Button
                      key={timeIndex}
                      onClick={() => handleShowtimeClick(key, time)}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>
      <SelectTicketNumberModal
        show={openModal}
        handleClose={handleModalClose}
      />
    </div>
  );
};
