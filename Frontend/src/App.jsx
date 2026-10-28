import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Machines from "./pages/Machines";

function App() {
  return (
    <BrowserRouter>
      {" "}
      <Routes>
        {" "}
        <Route path="/" element={<Auth />} />{" "}
        <Route path="/login" element={<Auth />} />{" "}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              {" "}
              <Dashboard />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/machines"
          element={
            <ProtectedRoute>
              <Machines />
            </ProtectedRoute>
          }
        />
      </Routes>{" "}
    </BrowserRouter>
  );
}
export default App;
