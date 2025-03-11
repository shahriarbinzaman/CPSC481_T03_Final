import { createContext, useState } from "react";

const defaultContext = {
  movieId: null,
  movieTitle: "",
  format: "",
  date: "",
  showtime: "",
  seats: [],
  adultTickets: 0,
  childTickets: 0,
  setMovieId: () => {},
  setMovieTitle: () => {},
  setFormat: () => {},
  setDate: () => {},
  setShowtime: () => {},
  setSeats: () => {},
  setAdultTickets: () => {},
  setChildTickets: () => {},
};

export const UserSelectionContext = createContext(defaultContext);

export const UserSelectionProvider = ({ children }) => {
  const [movieId, setMovieId] = useState(null);
  const [movieTitle, setMovieTitle] = useState("");
  const [format, setFormat] = useState("");
  const [date, setDate] = useState("");
  const [showtime, setShowtime] = useState("");
  const [seats, setSeats] = useState([]);
  const [adultTickets, setAdultTickets] = useState(0);
  const [childTickets, setChildTickets] = useState(0);

  return (
    <UserSelectionContext.Provider
      value={{
        movieId,
        movieTitle,
        format,
        date,
        showtime,
        seats,
        adultTickets,
        childTickets,
        setMovieId,
        setMovieTitle,
        setFormat,
        setDate,
        setShowtime,
        setSeats,
        setAdultTickets,
        setChildTickets,
      }}
    >
      {children}
    </UserSelectionContext.Provider>
  );
};
