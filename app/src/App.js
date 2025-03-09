import { Routes, Route } from "react-router-dom";

import "./App.css";
import { Home, MovieShowtimes } from "./pages";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieShowtimes />} />
      </Routes>
    </div>
  );
}

export default App;
