import { useNavigate } from "react-router-dom";
import { useState } from "react";

import Camera from "../Components/Home_Components/Camera";
import { pickImage, uploadImage } from "../Components/Home_Components/FileUpload";
import CameraToolBar from "../Components/Home_Components/CameraToolBar";
import "./Home.minimal.css";

export default function Home({ setScanState, setPhoto }) {
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

  async function validateImage(file) {
    if (!file) {
      throw new Error("No file provided");
    }

    if (file.size > 10 * 1024 * 1024) {
      throw new Error("Image too large");
    }

    const validTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!validTypes.includes(file.type)) {
      throw new Error("Invalid file type");
    }

    const url = URL.createObjectURL(file);

    try {
      const img = new Image();
      img.src = url;

      await img.decode();

      if (img.width < 100 || img.height < 100) {
        throw new Error("Image too small");
      }

      return true;
    } finally {
      URL.revokeObjectURL(url);
    }
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
