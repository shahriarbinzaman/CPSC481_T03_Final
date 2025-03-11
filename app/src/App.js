import { Routes, Route } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import "./App.css";
import { Home, MovieShowtimes, SeatSelection, OrderSummary } from "./pages";
import { UserSelectionProvider } from "./contexts";
import CustomSeatPicker from "./components/CustomSeatPicker";

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
            <Route path="/test" element={<CustomSeatPicker />} />
          </Routes>
        </UserSelectionProvider>
      </LocalizationProvider>
    </div>
  );
}

export default App;
