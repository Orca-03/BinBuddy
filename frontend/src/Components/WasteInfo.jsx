import React from 'react';

const WasteInfoComponent = () => {
  return (
    <section className="waste-info">
      <h2>Item Name</h2>

      <div className="wrong-item">
        <label htmlFor="wrong-item-select">Wrong item?</label>
        <select id="wrong-item-select" name="wrongItem">
          <option value="">Select an option</option>
          <option value="item1">Placeholder item 1</option>
          <option value="item2">Placeholder item 2</option>
          <option value="item3">Placeholder item 3</option>
        </select>
      </div>

      <div className="item-info">
        <h3>Item Info and Disposal</h3>
        <p>Placeholder for item info and disposal instructions.</p>
      </div>

      <div className="recycling-links">
        <h3>Recycling Links</h3>
        <p>Placeholder for recycling links data.</p>
      </div>
    </section>
  );
};

export default WasteInfoComponent;
