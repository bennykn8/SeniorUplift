import React from 'react';
import { useLocation } from 'react-router-dom';
import './NursingHomeDetail.css';  // Create this CSS file for styling

const NursingHomeDetail = () => {
  const { state: home } = useLocation();  // Get the passed home object from the state

  if (!home) {
    return <div>No nursing home details available.</div>;
  }

  return (
    <div className="nursing-home-detail-container">
      <h1>{home.name}</h1>
      <img src={home.image_url || 'default-image-url.jpg'} alt={home.name} className="nursing-home-detail-image" />

      <div className="nursing-home-detail-box">
        <p><strong>Location:</strong> {home.address}</p>
        <p><strong>Rating:</strong> {home.rating ? `${home.rating}/5` : "No rating available"}</p>
        <p><strong>Phone:</strong> {home.phone || "Phone not available"}</p>
        <p><strong>Website:</strong> <a href={home.website} target="_blank" rel="noopener noreferrer">{home.website || "Website not available"}</a></p>
        <p><strong>Hours:</strong> {home.hours || "No hours available"}</p>
      </div>

      <div className="nursing-home-description">
        <p>
          {home.name} is located at {home.address}. This facility offers a range of services and is {home.rating ? `rated ${home.rating}/5` : "currently unrated"} by its visitors. You can contact them via phone at {home.phone || "their phone number is unavailable at the moment"}. More information, including details about the facility and its offerings, can be found on their website at <a href={home.website} target="_blank" rel="noopener noreferrer">{home.website || "the website is not available"}</a>. The facility operates during the following hours: {home.hours || "no specific hours available at this time"}.
        </p>
      </div>
    </div>
  );
};

export default NursingHomeDetail;
