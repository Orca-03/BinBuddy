import React from 'react';
const CameraToolBar = ({ canCapture, handleCapture, handleGallery}) => {
  console.log(canCapture);

  return (
    <nav className="cameraToolBar">

  <button
    className="toolbar-btn toolbar-btn--secondary"
    onClick={() => {
      console.log("GALLERY CLICKED");
      handleGallery();
    }}
  >
    Gallery
  </button>

  <button
    className="toolbar-btn toolbar-btn--primary"
    disabled={!canCapture}
    onClick={handleCapture}
  >
    Take Photo
  </button>

</nav>
  );
};

export default CameraToolBar;