import { Routes, Route } from "react-router-dom";

import "./App.css";
import { Home, MovieShowtimes } from "./pages";
import RefundTicket from "./pages/Refund/RefundQR";
import RefundTicketInfo from "./pages/Refund/RefundQRInfo";
import MovieSchedule from "./pages/MovieSchedule";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieShowtimes />} />
        <Route path="/refund" element={<RefundTicket />} />
        <Route path="/refund/info" element={<RefundTicketInfo />} />
        <Route path="/movie-schedule" element={<MovieSchedule />} />
      </Routes>
    </div>
  );
}

export default App;
