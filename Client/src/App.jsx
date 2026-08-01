import { Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Events from "./Pages/Events";
import EventDetails from "./Pages/EventDetails";
import Dashboard from "./Pages/DashBoard";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import MyEvent from "./Pages/MyEvent";

import ProtectedRoute from "./Component/ProtectedRoute";
import MainLayout from "./Layout/MainLayout";

const App = () => {
  return (
    <Routes>

      {/* Routes with Navbar & Footer */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-events"
          element={
            <ProtectedRoute>
              <MyEvent />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Routes without Navbar & Footer */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

    </Routes>
  );
};

export default App;