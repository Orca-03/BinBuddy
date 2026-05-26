// Backend should handle image processing this includes dimensions, file size, etc.

import { useRef, useEffect } from "react";

export default function Camera({ setCameraAPI }) {
    const videoRef = useRef(null);
    const streamRef = useRef(null);

    useEffect(() => {
        async function startCamera() {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "environment" }
            });

            videoRef.current.srcObject = stream;
            streamRef.current = stream;

            setCameraAPI({
                takePhoto: takePhoto,
                stop: stopCamera
            });
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
        const photo = document.createElement("canvas");
        const ctx = photo.getContext("2d");
        photo.width = video.videoWidth;
        photo.height = video.videoHeight;
        ctx.drawImage(video, 0, 0);
        return photo.toDataURL("image/png");
    }
        
    return (
        <video ref={videoRef} autoPlay playsInline />
    );
}