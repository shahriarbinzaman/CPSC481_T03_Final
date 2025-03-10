import { useContext } from "react";

import { UserSelectionContext } from "../contexts";
import { Navbar } from "../components/Navbar";

export const SeatSelection = () => {
  const { movieId, movieTitle, format, date, showtime, seat } =
    useContext(UserSelectionContext);
  console.log(movieId, movieTitle, format, date, showtime);
  return (
    <>
      <Navbar />
      <h1>SEAT SELECTION</h1>
    </>
  );
};
