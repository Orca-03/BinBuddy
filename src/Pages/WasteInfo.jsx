import { useNavigate } from "react-router-dom";
import { useState } from "react";
import WasteInfoComponent from "../Components/WasteInfoComponent";

export default function WasteInfo({ scanState, setScanState, photo }) {
  //TO DO:: Create conditional logic to inform user of bad picture.
  const navigate = useNavigate();
  return (
    <div>
    <h1>Waste Info</h1>

      {scanState === "preview" || scanState === "evaluated" && 
        <>
          {photo && <img src={photo} alt="captured" />} 
          <br />
        </>
      }

      {scanState === "rejected" &&
        <div>
          <h3>Bad Picture</h3>
          <p>Please retake the picture and ensure the item is fully visible.</p>
        </div>
      }

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

      {scanState === "evaluated" && 
        <WasteInfoComponent/>
      }

    </div>
  );
}