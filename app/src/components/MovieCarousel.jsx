import { Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import movieMetaData from "../assets/movieMetaData";
import "./MovieCarousel.css";

const MovieCarousels = () => {
  const navigate = useNavigate();

  /**
   * Create a 2D array, where each subarray contains 2 elements
   * @param {Array} arr the array to be chunked
   * @param {Number} size the size of each subarray
   * @returns {Array[]} a 2D array
   */
  const chunkArray = (arr, size) => {
    return arr.reduce((resArr, item, index) => {
      if (index % size === 0) {
        resArr.push(arr.slice(index, index + size));
      }
      return resArr;
    }, []);
  };

  const movieInfo = chunkArray(movieMetaData.movies, 2);

  return (
    <Carousel>
      {movieInfo.map((chunk, index) => {
        return (
          <Carousel.Item key={index}>
            <div className="carousel-content">
              {chunk.map((movie, index) => {
                return (
                  <img
                    src={require(`../assets/movies/${movie.imagePath}`)}
                    alt={movie.title}
                    key={index}
                    onClick={() => navigate(`/movie/${movie.id}`)}
                  />
                );
              })}
            </div>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

export default MovieCarousels;
