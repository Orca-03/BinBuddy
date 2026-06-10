import { useNavigate } from "react-router-dom";
import { useState } from "react";

import Camera from "../Components/Camera";
import { pickImage, uploadImage } from "../Components/FileUpload";
import { validateImage } from "../Components/FileUpload";
import CameraToolBar from "../Components/CameraToolBar";

export default function Home({setScanState, setPhoto}) {
  const navigate = useNavigate();
  const [cameraAPI, setCameraAPI] = useState(null);

    async function processImage(file) {
        if (!file) return;
        await validateImage(file);
        const imageURL = URL.createObjectURL(file);
        setPhoto(imageURL);
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
    <div>
      <Camera 
        setCameraAPI={setCameraAPI}
      />
      <CameraToolBar 
        canCapture={!!cameraAPI}
        handleCapture={handleCapture}
        handleGallery={handleGallery}
      />
      <p></p>
    </div>
  );
}
