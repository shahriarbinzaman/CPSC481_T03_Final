import Logo from "../components/Logo";
import { useParams } from "react-router-dom";

import movieMetaData from "../assets/movieMetaData.json";
import CustomDatePicker from "../components/CustomDatePicker";

export const MovieShowtimes = () => {
  const { id } = useParams();
  const movieDetail = movieMetaData.movies.find((movie) => movie.id === id);

  return (
    <div>
      <Logo />
      <div className="d-flex mx-4 mt-4">
        <img
          src={require(`../assets/movies/${movieDetail.imagePath}`)}
          alt={movieDetail.title}
          className="movie-detail-image"
        />
        <div className="d-flex flex-column  align-items-start">
          <h1 className="mt-2 mb-5">{movieDetail.title}</h1>
          <h4>Length: {movieDetail.length}</h4>
          <h4>Genre: {movieDetail.genre}</h4>
        </div>
      </div>
      <CustomDatePicker />
    </div>
  );
};
