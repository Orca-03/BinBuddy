import React from "react";
import { useState, useEffect } from "react";
import "./WasteReportCard.css";

const WasteInfoComponent = ({ prediction }) => {
  const [evaluatedItem, setEvaluatedItem] = useState(prediction.category);
  const [disposalInfo, setDisposalInfo] = useState(null);

  useEffect(() => {
    const fetchWasteInfo = async () => {
      const response = await fetch(
        `http://localhost:8000/api/waste/${evaluatedItem}`,
      );

      const result = await response.json();
      setDisposalInfo(result);
    };

    if (evaluatedItem) {
      fetchWasteInfo();
    }
  }, [evaluatedItem]);

  return (
    <section className="WasteReportCard">
      <h2 className="item-name">Item: {evaluatedItem}</h2>

      {/* Wrong Item Selector */}
      <div className="wrong-item">
        <select
          id="wrong-item-select"
          name="wrongItem"
          onChange={(e) => setEvaluatedItem(e.target.value)}
        >
          <option value="">Wrong Item?</option>

          {Object.entries(prediction["conf-scores"])
            .sort((a, b) => b[1] - a[1])
            .map(([label, score]) => (
              <option key={label} value={label}>
                {label}
              </option>
            ))}
        </select>
      </div>

      {/* Waste Item Dispoal Info */}
      <div className="item-info">
        <h3>Item Info and Disposal</h3>
        <br />
        <div>
          {(disposalInfo?.info ?? ["No information available."]).map(
            (line, index) =>
              line === "" ? <br key={index} /> : <p key={index}>{line}</p>,
          )}
        </div>
      </div>

      {/* Source Links*/}
      <div className="links">
        <h3>Recycling Links</h3>
        <br />
        <a href="https://recyclebc.ca/wp-content/uploads/2017/03/Curbside_Recycling_Guide_Web-1.pdf ">
          Recycling BC
        </a>
        <a href="https://vancouver.ca/home-property-development/garbage.aspx ">
          Vancouver Dispoal Guide
        </a>
      </div>

    </section>
  );
};

export default WasteInfoComponent;
