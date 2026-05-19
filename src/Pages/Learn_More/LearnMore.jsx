import React from "react";
import { useNavigate } from "react-router-dom";


export default function LearnMore() {
  const navigate = useNavigate();
  console.log("LEARNMORE MOUNTED");
  return (
    <div className="learn-more-page">
      <h1>Learn More</h1>
      <div className="learn-more-buttons">
        <button type="button" onClick={() => {navigate("/App_Info");}}>App Info</button>
        <button type="button" onClick={() => {navigate("/Privacy_Policy");}}>Privacy Policy</button>
        <button type="button" onClick={() => {navigate("/FAQ");}}>FAQ</button>
        <button type="button" onClick={() => {navigate("/About");}}>About</button>
        </div>
    </div>
  );
}

