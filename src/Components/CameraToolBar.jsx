import React from 'react';
import { useNavigate } from "react-router-dom";


const CameraToolBar = ({ canCapture, handleCapture }) => {
const navigate = useNavigate();

  console.log(canCapture);

  return (
    <nav className="cameraToolBar">

      <button type="button">Gallery</button>

      <button
        disabled={!canCapture}
        onClick={ handleCapture }
      >
        Camera</button>
    </nav>
  );
};

export default CameraToolBar;