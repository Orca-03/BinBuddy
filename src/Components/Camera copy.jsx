// Backend should handle image processing this includes dimensions, file size, etc.

import { useRef, useState, useEffect } from "react";
import CameraToolbar from "./CameraToolBar";

export default function Camera() {
    const videoRef = useRef(null);
    const streamRef = useRef(null);
    const photoRef = useRef(null);

    const [permission, setPermission] = useState("pending");
    const [error, setError] = useState(null);
    const [photo, setPhoto] = useState(null);

    useEffect(() => {
        async function startCamera() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "environment" }
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            streamRef.current = stream;
            setPermission("granted");

            } 
        catch (err) {
            console.error(err);
            setPermission("denied");
            setError("Camera permission denied");
            }

    }

    startCamera();
    return () => {stopCamera();};

}, []);

    function stopCamera() {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
        }
    }

    function takePhoto() {
        const video = videoRef.current;
        const photo = canvasRef.current;
        const ctx = photo.getContext("2d");
        photo.width = video.videoWidth;
        photo.height = video.videoHeight;
        ctx.drawImage(video, 0, 0);
        const imageData = photo.toDataURL("image/png");
        setPhoto(imageData);
        stopCamera();
    }
        
    return (
    <div>
        {permission === "pending" && <p>Requesting camera...</p>}
        {permission === "denied" && <p>{error}</p>}
        <video ref={videoRef} autoPlay playsInline />
        <canvas ref={photoRef} style={{ display: "none" }} />
        <CameraToolbar onTakePhoto={takePhoto} />
    </div>
    );

}