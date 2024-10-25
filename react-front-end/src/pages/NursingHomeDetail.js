import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './NursingHomeDetail.css';  
const NursingHomeDetail = () => {
  const { state: home } = useLocation();  
  const [hospitals, setHospitals] = useState([]);
  const [entertainment, setEntertainment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (home) {
      fetchDummyNearbyLocations();  
    }
  }, [home]);

  const fetchDummyNearbyLocations = () => {
    try {
      const dummyHospitals = [
        { name: "City Hospital", address: "123 Health St, Cityville", rating: 4.5, phone: "123-456-7890" },
        { name: "General Clinic", address: "456 Wellness Rd, Cityville", rating: 4.0, phone: "234-567-8901" }
      ];
      setHospitals(dummyHospitals);

      const dummyEntertainment = [
        { name: "City Cinema", address: "789 Movie Ln, Cityville", rating: 4.7, phone: "345-678-9012" },
        { name: "Amusement Park", address: "101 Fun St, Cityville", rating: 4.8, phone: "456-789-0123" }
      ];
      setEntertainment(dummyEntertainment);
    } catch (err) {
      setError('Error fetching nearby locations.');
    } finally {
      setLoading(false);
    }
  };

  if (!home) {
    return <div>No nursing home details available.</div>;
  }

  if (loading) {
    return <div>Loading details and nearby locations...</div>;
  }

  if (error) {
    return <div>{error}</div>;
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

      {/* Display nearby hospitals */}
      <div className="nearby-locations">
        <h2>Nearby Hospitals</h2>
        {hospitals.length > 0 ? (
          <ul>
            {hospitals.map((hospital, index) => (
              <li key={index}>
                <strong>{hospital.name}</strong><br />
                {hospital.address}<br />
                Rating: {hospital.rating ? `${hospital.rating}/5` : "No rating available"}<br />
                Phone: {hospital.phone || "Phone not available"}
              </li>
            ))}
          </ul>
        ) : (
          <p>No nearby hospitals found.</p>
        )}
      </div>

      {/* Display nearby entertainment */}
      <div className="nearby-locations">
        <h2>Nearby Entertainment</h2>
        {entertainment.length > 0 ? (
          <ul>
            {entertainment.map((place, index) => (
              <li key={index}>
                <strong>{place.name}</strong><br />
                {place.address}<br />
                Rating: {place.rating ? `${place.rating}/5` : "No rating available"}<br />
                Phone: {place.phone || "Phone not available"}
              </li>
            ))}
          </ul>
        ) : (
          <p>No nearby entertainment found.</p>
        )}
      </div>
    </div>
  );
};

export default NursingHomeDetail;
