import React from 'react';
import './Entertainment.css';  // Assuming you will add the styles here

const Entertainment = () => {
  return (
    <div className="entertainment-container">
      <h1 className="entertainment-title">Find Entertainment Near You</h1>
      <p className="entertainment-description">
        Explore engaging entertainment options for seniors in Texas. Find nearby events, activities, and places that provide joy and fun.
      </p>
      
      {/* Placeholder for list or grid of entertainment options */}
      <div className="entertainment-list">
        <div className="entertainment-item">
          <h3>Community Events</h3>
          <p>Location: Houston, TX</p>
          <p>Rating: 4.7/5</p>
        </div>
        <div className="entertainment-item">
          <h3>Senior Movie Night</h3>
          <p>Location: Austin, TX</p>
          <p>Rating: 4.9/5</p>
        </div>
        {/* Add more entertainment items as needed */}
      </div>
    </div>
  );
};

export default Entertainment;
