import { Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import LearnMore from "./pages/Learn_More/LearnMore";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Learn_More" element={<LearnMore />} />
      </Routes>
    </>
  );
}