import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './EntertainmentDetail.css'; 
const EntertainmentDetail = () => {
  const { state: entertainment } = useLocation();  
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (entertainment) {
      fetchDummyNearbyLocations();  
    }
  }, [entertainment]);

  // Dummy function to simulate fetching nearby hospitals
  const fetchDummyNearbyLocations = () => {
    try {
      const dummyHospitals = [
        { name: "General Hospital", address: "123 Medical St, Entertainmentville", rating: 4.2, phone: "123-456-7890" },
        { name: "Health Clinic", address: "789 Wellness Rd, Entertainmentville", rating: 4.1, phone: "234-567-8901" }
      ];
      setHospitals(dummyHospitals);
    } catch (err) {
      setError('Error fetching nearby locations.');
    } finally {
      setLoading(false);
    }
  };

  if (!entertainment) {
    return <div>No entertainment details available.</div>;
  }

  if (loading) {
    return <div>Loading entertainment details and nearby locations...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="entertainment-detail-container">
      <h1>{entertainment.title}</h1>
      <img src={entertainment.image_url || 'default-image-url.jpg'} alt={entertainment.title} className="entertainment-detail-image" />

      <div className="entertainment-detail-box">
        <p><strong>Location:</strong> {entertainment.city}</p>
        <p><strong>Venue:</strong> {entertainment.location || "Venue not available"}</p>
        <p><strong>Cost:</strong> {entertainment.cost || "Cost not available"}</p>
        <p><strong>Category:</strong> {entertainment.category || "Category not available"}</p>
        <p><strong>Time:</strong> {entertainment.event_time || "Time not available"}</p>
      </div>

      <div className="entertainment-description">
        <p>
          {entertainment.title} is located at {entertainment.city}. This venue offers entertainment in the category of {entertainment.category || "various activities"}. It is available at {entertainment.event_time || "unspecified times"}. The venue is at {entertainment.location || "a location not specified"}. The event has a {entertainment.cost || "varied"} cost structure.
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
    </div>
  );
};

export default EntertainmentDetail;
