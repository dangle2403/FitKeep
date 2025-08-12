import { Routes, Route } from "react-router-dom";
import SignupPage from "./pages/signup/SignupPage";
import SigninPage from "./pages/signin/SigninPage";
import Homepage from "./pages/homepage/Homepage";
import Navbar from "./components/navbar";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/" element={<Homepage />} />
      </Routes>
    </div>
  );
};

export default App;
