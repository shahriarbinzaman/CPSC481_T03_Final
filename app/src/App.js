import { Routes, Route } from "react-router-dom";

import "./App.css";
import { Home, MovieShowtimes } from "./pages";
import RefundTicket from "./pages/Refund/RefundQR";
import RefundTicketInfo from "./pages/Refund/RefundQRInfo";
import MovieSchedule from "./pages/MovieSchedule";
import ErrorPage from "./pages/ErrorPage";
import EnjoyMovie from "./pages/EnjoyMovie";
import PinPad from "./pages/PinPad";
import SelectPayment from "./pages/SelectPayment";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieShowtimes />} />
        <Route path="/refund" element={<RefundTicket />} />
        <Route path="/refund/info" element={<RefundTicketInfo />} />
        <Route path="/movie-schedule" element={<MovieSchedule />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/print" element={<EnjoyMovie />} />
        <Route path="/pin-pad" element={<PinPad />} />
        <Route path="/select-payment" element={<SelectPayment />} />
      </Routes>
    </div>
  );
}

export default App;
