import React from 'react';
import "./cameraToolBar.minimal.css"
import { FaCamera } from "react-icons/fa";
import { GrGallery } from "react-icons/gr";

const CameraToolBar = ({ canCapture, handleCapture, handleGallery}) => {
  console.log(canCapture);

  return (
    <nav className="cameraToolBar">

{/* <div className="spacer">SPACER</div> */}

  <button
    className="toolbar-btn toolbar-btn--secondary"
    onClick={() => {
      console.log("GALLERY CLICKED");
      handleGallery();
    }}
  >
    <GrGallery className="gallery-icon" />
  </button>

  <button
    className="toolbar-btn toolbar-btn--primary"
    disabled={!canCapture}
    onClick={handleCapture}
  >
    <FaCamera   className="camera-icon"  />
  </button>

</nav>



  );
};

export default CameraToolBar;