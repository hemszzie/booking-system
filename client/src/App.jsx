import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ExpertDetails from "./pages/ExpertDetails";
import MyBookings from "./pages/MyBookings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/expert/:id"
          element={<ExpertDetails />}
        />

        <Route
          path="/bookings"
          element={<MyBookings />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;