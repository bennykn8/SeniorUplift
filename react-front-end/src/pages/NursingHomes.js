import React from 'react';
import './NursingHomes.css';  // Assuming you will add CSS styles here

const NursingHomes = () => {
  return (
    <div className="nursing-homes-container">
      <h1 className="nursing-homes-title">Find Nursing Homes Near You</h1>
      <p className="nursing-homes-description">
        Explore top-rated nursing homes in Texas. Get detailed information about proximity, services, and ratings.
      </p>
      
      {/* Placeholder for list or grid of nursing homes */}
      <div className="nursing-homes-list">
        <div className="nursing-home-item">
          <h3>Nursing Home A</h3>
          <p>Location: Houston, TX</p>
          <p>Rating: 4.5/5</p>
        </div>
        <div className="nursing-home-item">
          <h3>Nursing Home B</h3>
          <p>Location: Austin, TX</p>
          <p>Rating: 4.7/5</p>
        </div>
        {/* Add more nursing home items as needed */}
      </div>
    </div>
  );
};

export default NursingHomes;
