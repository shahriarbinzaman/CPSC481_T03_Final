import { Routes, Route } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import "./App.css";
import { Home, MovieShowtimes, SeatSelection } from "./pages";
import { UserSelectionProvider } from "./contexts";
import RefundTicket from "./pages/Refund/RefundQR";
import RefundTicketInfo from "./pages/Refund/RefundQRInfo";
import MovieSchedule from "./pages/MovieSchedule";
import ErrorPage from "./pages/ErrorPage";
import EnjoyMovie from "./pages/EnjoyMovie";
import PinPad from "./pages/PinPad";
import SelectPayment from "./pages/SelectPayment";
import OrderSummary from "./pages/OrderSummary";
import Snack from "./pages/Snack";

function App() {
  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <UserSelectionProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id">
              <Route index element={<MovieShowtimes />} />
              <Route path="seat-selection" element={<SeatSelection />} />
              <Route path="order-summary" element={<OrderSummary />} />
            </Route>
            <Route path="/refund" element={<RefundTicket />} />
            <Route path="/refund/info" element={<RefundTicketInfo />} />
            <Route path="/movie-schedule" element={<MovieSchedule />} />
            <Route path="/error" element={<ErrorPage />} />
            <Route path="/print" element={<EnjoyMovie />} />
            <Route path="/pin-pad" element={<PinPad />} />
            <Route path="/select-payment" element={<SelectPayment />} />
          </Routes>
        </UserSelectionProvider>
      </LocalizationProvider>
    </div>
  );
}

export default App;
