
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import Camera from "../Components/Camera";
import { pickImage, uploadImage } from "../Components/FileUpload";
import { validateImage } from "../Components/FileUpload"; // validateImage should be a home function
import CameraToolBar from "../Components/CameraToolBar";
import "./Home.minimal.css"

export default function Home({setScanState, setPhoto}) {
  const navigate = useNavigate();
  const [cameraAPI, setCameraAPI] = useState(null);

    async function processImage(file) {
        if (!file) return;
        await validateImage(file);
        //const imageURL = URL.createObjectURL(file);
        setPhoto(file);
        setScanState("preview");
        navigate("/Waste_Info");
    }

    async function handleCapture() {
        if (!cameraAPI) return;
        const image = await cameraAPI.takePhoto();
        processImage(image);
    }

    async function handleGallery() {
      console.log("HANDLE GALLERY START");
      const file = await pickImage();      
      console.log("FILE RECEIVED:", file);
      processImage(file);

    }


return (
  <div className="home">
    <h1>BinBuddy</h1>
    <p>"Every piece of garbage deserves a proper end"</p>

    <div className="camera-card">
      <Camera setCameraAPI={setCameraAPI} />
    </div>

    <CameraToolBar
      canCapture={!!cameraAPI}
      handleCapture={handleCapture}
      handleGallery={handleGallery}
    />
  </div>
);
}
