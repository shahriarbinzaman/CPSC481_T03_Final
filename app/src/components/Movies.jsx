import { Carousel } from "react-bootstrap";
import { movieImages } from "../assets/assets";

const Movies = () => {
  return (
    <Carousel className="mx-1 my-3">
      <Carousel.Item>
        <div className="carousel-content">
          <img src={movieImages.image1} alt="Winter Soldier" />
          <img src={movieImages.image2} alt="Nezha 2" />
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="carousel-content">
          <img src={movieImages.image3} alt="The Men from UNCLE" />
          <img src={movieImages.image4} alt="Casino Royal" />
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="carousel-content">
          <img src={movieImages.image5} alt="DeadPool" />
          <img src={movieImages.image6} alt="Thunderbolt" />
        </div>
      </Carousel.Item>
    </Carousel>
  );
};

export default Movies;
