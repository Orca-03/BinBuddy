import { useNavigate } from "react-router-dom";
import { useState } from "react";

import Camera from "../Components/Camera";
import CameraToolBar from "../Components/CameraToolBar";

export default function Home({setScanState, setPhoto}) {
  const navigate = useNavigate();

  const [cameraAPI, setCameraAPI] = useState(null);

  function handleCapture() {
    if (!cameraAPI) return;
    const image = cameraAPI.takePhoto();
    setPhoto(image);
    setScanState("preview");
    navigate("/Waste_Info");
  }

  return (
    <div>
      <Camera 
        setCameraAPI={setCameraAPI}
      />
      <CameraToolBar 
        canCapture={!!cameraAPI}
        handleCapture={handleCapture}
      />
      <p></p>
    </div>
  );
}
