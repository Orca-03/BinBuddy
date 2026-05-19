import { Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import LearnMore from "./Pages/Learn_More/LearnMore";
import AppInfo from "./Pages/Learn_More/AppInfo";
import FAQ from "./Pages/Learn_More/FAQ";
import About from "./Pages/Learn_More/About";
import PrivacyPolicy from "./Pages/Learn_More/PrivacyPolicy";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Learn_More" element={<LearnMore />} />
        <Route path="/App_Info" element={<AppInfo />} />
        <Route path="/Privacy_Policy" element={<PrivacyPolicy />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/About" element={<About />} />
      </Routes>
    </>
  );
}