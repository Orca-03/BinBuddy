import React from 'react';
import "./WasteReportCard.css"

const WasteInfoComponent = () => {
  return (
    <section className="WasteReportCard">
      <h2 className='item-name'>Item Name</h2>
      <div className="wrong-item">
        <select id="wrong-item-select" name="wrongItem">
          <option value="">Wrong Item?</option>
          <option value="item1">Placeholder item 1</option>
          <option value="item2">Placeholder item 2</option>
          <option value="item3">Place holder item 3</option>
        </select>
      </div>

      <div className="item-info">
        <h3>Item Info and Disposal</h3>
        <br />
        <p>Placeholder for item info and disposal instructions.</p>
      </div>

      <div className="links">
        <h3>Recycling Links</h3>
        <br />
        <p>Placeholder for recycling links data.</p>
      </div>
    </section>
  );
};

export default WasteInfoComponent;
