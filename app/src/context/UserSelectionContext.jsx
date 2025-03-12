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
  snacks: {},
  setMovieId: () => {},
  setMovieTitle: () => {},
  setFormat: () => {},
  setDate: () => {},
  setShowtime: () => {},
  setSeats: () => {},
  setAdultTickets: () => {},
  setChildTickets: () => {},
  setSnacks: () => {},
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
  const [snacks, setSnacks] = useState({
    snacks: {},
    drinks: {},
    combos: {},
  });

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
        snacks,
        setMovieId,
        setMovieTitle,
        setFormat,
        setDate,
        setShowtime,
        setSeats,
        setAdultTickets,
        setChildTickets,
        setSnacks,
      }}
    >
      {children}
    </UserSelectionContext.Provider>
  );
};
