import React from 'react';
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <button onClick={() => window.history.back()}>Back</button>
      <button type="button">Update Location</button>
      <button type="button" onClick={() => navigate("/Learn_More")}>Learn More</button>
    </nav>
  );
};

export default Navbar;
