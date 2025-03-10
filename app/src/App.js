import { Routes, Route } from "react-router-dom";

import "./App.css";
import { Home, MovieShowtimes } from "./pages";
import { ShowtimeProvider } from "./contexts";

function App() {
  return (
    <div className="App">
      <ShowtimeProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie" element={<MovieShowtimes />} />
        </Routes>
      </ShowtimeProvider>
    </div>
  );
}

export default App;
