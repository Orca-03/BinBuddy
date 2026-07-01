import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import WasteReportCard from "../Components/WasteReportCard";
import "./WasteInfo.css"

export default function WasteInfo({ scanState, setScanState, photo }) {

  //TO DO:: Create conditional logic to inform user of bad picture.
  const navigate = useNavigate();
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    if (scanState !== "evaluated" || !photo) return;

    const sendImage = async () => {
      const formData = new FormData();

      formData.append("file", photo, "image.jpg");

      const response = await fetch(
        "http://localhost:8000/api/classify/",
        {
          method: "POST",
          body: formData
        }
      );

      const result = await response.json();
      setPrediction(result);
    };

      sendImage();
  }, [scanState, photo]);


  return (
    <div className="wasteInfo">
      <h1>Waste Info</h1>

      {(scanState === "preview" || scanState === "evaluated") && 
        <>
          <div className="photoFrame">
            {photo && (
              <img
                src={URL.createObjectURL(photo)}
                alt="captured"
              />
            )}
          </div>
          <br />
        </>
      }

      {scanState === "rejected" &&
        <div>
          <h3>Bad Picture</h3>
          <p>Please retake the picture and ensure the item is fully visible.</p>
        </div>
      }
      
      <div className="actionRow">
        <button 
          onClick={() => {
            navigate("/");
            setScanState("idle");
          }}>
          Retake</button>

        {scanState === "preview" && 
          <button onClick={() => 
            setScanState("evaluated")}>
          Confirm</button> 
        }
      </div>

      {scanState === "evaluated" && prediction && (
        <>
          <div>
            <h2>{prediction.category}</h2>

            <pre>
              {JSON.stringify(prediction, null, 2)}
            </pre>
          </div>

          <WasteReportCard />
        </>
      )}

    </div>
  );
}