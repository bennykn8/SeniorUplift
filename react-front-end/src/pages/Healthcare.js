import React from 'react';
import './Healthcare.css';  // Assuming you will add the styles here

const Healthcare = () => {
  return (
    <div className="healthcare-container">
      <h1 className="healthcare-title">Find Healthcare Centers Near You</h1>
      <p className="healthcare-description">
        Explore top-rated healthcare centers in Texas. Get detailed information about proximity, services, and ratings.
      </p>
      
      {/* Placeholder for list or grid of healthcare centers */}
      <div className="healthcare-list">
        <div className="healthcare-item">
          <h3>Healthcare Center A</h3>
          <p>Location: Houston, TX</p>
          <p>Rating: 4.8/5</p>
        </div>
        <div className="healthcare-item">
          <h3>Healthcare Center B</h3>
          <p>Location: Austin, TX</p>
          <p>Rating: 4.6/5</p>
        </div>
        {/* Add more healthcare center items as needed */}
      </div>
    </div>
  );
};

export default Healthcare;
