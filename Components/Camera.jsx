// Backend should handle image processing this includes dimensions, file size, etc.

import { useRef, useEffect } from "react";

export default function Camera({ setCameraAPI }) {
    const videoRef = useRef(null);
    const streamRef = useRef(null);

useEffect(() => {
  let stream;

    async function startCamera() {
        try {
        stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" }
        });

        if (!videoRef.current) return;

        videoRef.current.srcObject = stream;
        streamRef.current = stream;

        videoRef.current.onloadedmetadata = () => {
            videoRef.current.play();
        };

        setCameraAPI({
            takePhoto,
            stop: stopCamera
        });

        } catch (err) {
        console.error("Camera failed:", err);
        }
    }

    startCamera();

    return () => {
        stopCamera();
    };
    }, []);
    

    function stopCamera() {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
        }
    }

    function takePhoto() {
        const video = videoRef.current;
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0);

        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                resolve(blob);
            }, "image/png");
        });
    }
        
    return (
        <video ref={videoRef} 
        autoPlay 
        playsInline
        className="camera-feed" />
    );
}