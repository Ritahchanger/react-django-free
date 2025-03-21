import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/authenticate/Login/Login";
import Signup from "./pages/authenticate/Signup/Signup";
import UntakenJobs from "./pages/main/Jobs/UntakenJobs";
import UsersJobs from "./pages/main/Jobs/UsersJobs";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/jobs" element={<UntakenJobs />} />
        <Route path="/user/jobs" element={<UsersJobs />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
