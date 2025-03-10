import { createContext, useState } from "react";

const defaultContext = {
  id: null,
  movieTitle: "",
  format: "",
  date: "",
  showtime: "",
  seat: [],
  setMovieId: () => {},
  setMovieTitle: () => {},
  setFormat: () => {},
  setDate: () => {},
  setShowtime: () => {},
  setSeat: () => {},
};

export const ShowtimeContext = createContext(defaultContext);

export const ShowtimeProvider = ({ children }) => {
  const [movieId, setMovieId] = useState(null);
  const [movieTitle, setMovieTitle] = useState("");
  const [format, setFormat] = useState("");
  const [date, setDate] = useState("");
  const [showtime, setShowtime] = useState("");
  const [seat, setSeat] = useState([]);

  return (
    <ShowtimeContext.Provider
      value={{
        movieId,
        movieTitle,
        format,
        date,
        showtime,
        seat,
        setMovieId,
        setMovieTitle,
        setFormat,
        setDate,
        setShowtime,
        setSeat,
      }}
    >
      {children}
    </ShowtimeContext.Provider>
  );
};
