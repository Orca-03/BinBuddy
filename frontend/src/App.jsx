import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCookie, setCookie } from "./Components/Cookies";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import LearnMore from "./Pages/Learn_More_Pages/LearnMore";
import AppInfo from "./Pages/Learn_More_Pages/AppInfo";
import FAQ from "./Pages/Learn_More_Pages/FAQ";
import About from "./Pages/Learn_More_Pages/About";
import PrivacyPolicy from "./Pages/Learn_More_Pages/PrivacyPolicy";
import WasteInfo from "./Pages/WasteInfo";



export default function App() {
  const [scanState, setScanState] = useState("idle");
  const [photo, setPhoto] = useState(null);
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    const seen = getCookie("seenIntro");

    if (!seen) {
      setShowIntro(true);
    }
  }, []);

  if (showIntro) {
    return <AppInfo setShowIntro={setShowIntro}/>;
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home setScanState={setScanState} setPhoto={setPhoto} />} />
        <Route path="/Learn_More" element={<LearnMore />} />
        <Route path="/App_Info" element={<AppInfo />} />
        <Route path="/Privacy_Policy" element={<PrivacyPolicy />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/About" element={<About />} />
        <Route path="/Waste_Info" element={<WasteInfo scanState={scanState} setScanState={setScanState} photo={photo} />} />
      </Routes>
    </>
  );
}



