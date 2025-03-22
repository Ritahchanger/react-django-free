import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/authenticate/Login/Login";
import Signup from "./pages/authenticate/Signup/Signup";
import UntakenJobs from "./pages/main/Jobs/UntakenJobs";
import UsersJobs from "./pages/main/Jobs/UsersJobs";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/Protected/Protected";

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <UntakenJobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/jobs"
          element={
            <ProtectedRoute>
              <UsersJobs />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
