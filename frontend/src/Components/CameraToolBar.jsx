import React from 'react';
const CameraToolBar = ({ canCapture, handleCapture, handleGallery}) => {
  console.log(canCapture);

  return (
    <nav className="cameraToolBar">

      <button
        onClick={() => {
            console.log("GALLERY CLICKED");
            handleGallery();
        }}>  
        Gallery</button>

      <button
        disabled={!canCapture}
        onClick={ handleCapture }
      >
        Take Photo</button>
    </nav>
  );
};

export default CameraToolBar;