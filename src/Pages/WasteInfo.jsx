import { useNavigate } from "react-router-dom";
import { useState } from "react";
export default function WasteInfo({ scanState, setScanState }) {
  //TO DO:: Create conditional logic to inform user of bad picture.
  console.log("scanState =", scanState);
  return (
    <div>
    <h1>Waste Info</h1>

      

      {scanState === "preview" && 
        <>
          {/* image preview */}
        </>
      }
      <button>Retake</button>

      {scanState === "preview" && 
        <button onClick={() => 
          setScanState("evaluated")}>
        Confirm</button> }

      {scanState === "rejected" &&
        <div>
          <h3>Bad Picture</h3>
          <p>Please retake the picture and ensure the item is fully visible.</p>
        </div>
      }

      {scanState === "evaluated" && 
        <div>
          <h3>Name</h3><button>Wrong Item?</button>
          <h5>Item Info:</h5>
          <p></p>
          <h5>Links:</h5>
          <a href=""></a>
        </div>
      }

    </div>
  );
}