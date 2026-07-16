import React from 'react';
import "./cameraToolBar.minimal.css"
import { FaCamera } from "react-icons/fa";
import { GrGallery } from "react-icons/gr";

const CameraToolBar = ({ canCapture, handleCapture, handleGallery }) => {

  return (
    <nav className="cameraToolBar">

      {/* Gallery Button */}
      <button
        className="toolbar-btn toolbar-btn--secondary"
        onClick={() => {
          handleGallery();
        }}
      >
        <GrGallery className="gallery-icon" />
      </button>

      {/* Camera Button */}
      <button
        className="toolbar-btn toolbar-btn--primary"
        disabled={!canCapture}
        onClick={handleCapture}
      >
        <FaCamera className="camera-icon" />
      </button>

    </nav>



  );
};

export default CameraToolBar;