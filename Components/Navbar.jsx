import "./navbar.css";
import React from 'react';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <button className="nav-btn nav-btn--back" onClick={() => window.history.back()}>
        Back
      </button>

      <div className="nav-actions">
        <button className="nav-btn" type="button">
          Update Location
        </button>
        <button className="nav-btn" type="button" onClick={() => navigate("/Learn_More")}>
          Learn More
        </button>
      </div>
    </nav>
  );
};

export default Navbar;