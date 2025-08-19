import { Routes, Route } from "react-router-dom";
import SignupPage from "./pages/signup/SignupPage";
import SigninPage from "./pages/signin/SigninPage";
import HomePage from "./pages/homepage/HomePage";
import Navbar from "@/components/Navbar";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signin" element={<SigninPage />} />
      </Routes>
    </div>
  );
};

export default App;
