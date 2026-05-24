import React from 'react';
import { useNavigate } from "react-router-dom";

const CameraToolBar = ({ setScanState }) => {
const navigate = useNavigate();

  return (
    <nav className="cameraToolBar">
      <button type="button">Gallery</button>

      <button
        type="button"
        onClick={() => {
          setScanState("preview");
          navigate("/Waste_Info");
        }}
      >
        Camera
      </button>
    </nav>
  );
};

export default CameraToolBar;