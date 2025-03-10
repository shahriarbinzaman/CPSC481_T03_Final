import { useContext } from "react";
import { Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

import Logo from "../components/Logo";
import movieMetaData from "../assets/movieMetaData.json";
import CustomDatePicker from "../components/CustomDatePicker";
import { UserSelectionContext } from "../contexts";

export const MovieShowtimes = () => {
  const movieId = useParams().id;
  const movieDetail = movieMetaData.movies.find(
    (movie) => movie.id === movieId
  );

  const { setShowtime, setFormat } = useContext(UserSelectionContext);

  const navigate = useNavigate();

  const handleShowtimeClick = (format, time) => {
    setShowtime(time);
    setFormat(format);
    console.log(format);
    navigate(`/movie/${movieId}/seat-selection`);
  };

  return (
    <div>
      <Logo />
      <div className=" movie-showtime-page d-flex flex-column align-items-start justify-content-around mt-4">
        <div className="d-flex mb-4">
          <img
            src={require(`../assets/movies/${movieDetail.imagePath}`)}
            alt={movieDetail.title}
            className="movie-info"
          />
          <div className="d-flex flex-column  align-items-start">
            <h1 className="mt-2 mb-5">{movieDetail.title}</h1>
            <h4>Length: {movieDetail.length}</h4>
            <h4>Genre: {movieDetail.genre}</h4>
          </div>
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
    </div>
  );
};
