import { useNavigate } from "react-router-dom";
import { useState } from "react";
import WasteReportCard from "../Components/WasteReportCard";
import "./WasteInfo.css"

export default function WasteInfo({ scanState, setScanState, photo }) {
  //TO DO:: Create conditional logic to inform user of bad picture.
  const navigate = useNavigate();
  return (
    <div className="wasteInfo">
    <h1>Waste Info</h1>

      {(scanState === "preview" || scanState === "evaluated") && 
        <>
          <div className="photoFrame">
            {photo && <img src={photo} alt="captured" />}
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

        {scanState === "evaluated" && 
          <WasteReportCard/>
        }

    </div>
  );
}