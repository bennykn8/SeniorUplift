import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './HealthcareDetail.css';

const HealthcareDetail = () => {
  const { state: center } = useLocation();
  const [nearbyHospitals, setNearbyHospitals] = useState([]);
  const [nearbyEntertainment, setNearbyEntertainment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (center) {
      fetchNearbyLocations();
    }
  }, [center]);

  const fetchNearbyLocations = () => {
    try {
      const dummyHospitals = [
        { name: "City Clinic", address: "123 Health St, Cityville", rating: 4.6, phone: "123-456-7890" },
        { name: "Wellness Center", address: "456 Care Rd, Cityville", rating: 4.3, phone: "234-567-8901" }
      ];
      setNearbyHospitals(dummyHospitals);

      const dummyEntertainment = [
        { name: "City Theater", address: "789 Art Ln, Cityville", rating: 4.7, phone: "345-678-9012" },
        { name: "Museum of History", address: "101 Museum St, Cityville", rating: 4.5, phone: "456-789-0123" }
      ];
      setNearbyEntertainment(dummyEntertainment);
    } catch (err) {
      setError('Error fetching nearby locations.');
    } finally {
      setLoading(false);
    }
  };

  if (!center) {
    return <div>No healthcare center details available.</div>;
  }

  if (loading) {
    return <div>Loading details and nearby locations...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="healthcare-detail-container">
      <h1>{center.name}</h1>
      <img src={center.image_url || 'default-image-url.jpg'} alt={center.name} className="healthcare-detail-image" />

      <div className="healthcare-detail-box">
        <p><strong>Location:</strong> {center.city}</p>
        <p><strong>Beds:</strong> {center.beds || "N/A"}</p>
        <p><strong>Discharges:</strong> {center.discharges || "N/A"}</p>
        <p><strong>Patient Days:</strong> {center.patient_days || "N/A"}</p>
        <p><strong>Revenue:</strong> {center.revenue ? `$${center.revenue.toLocaleString()}` : "N/A"}</p>
      </div>

      <div className="healthcare-description">
        <p>
          {center.name} is located in {center.city}. This healthcare center offers a range of services and has {center.beds || "an unknown number of beds"}. The facility serves patients with {center.discharges || "no recorded"} discharges and has {center.patient_days || "unknown"} patient days recorded. It operates with a gross revenue of {center.revenue ? `$${center.revenue.toLocaleString()}` : "no available revenue data"}.
        </p>
      </div>

      {/* Nearby Hospitals Section */}
      <div className="nearby-locations">
        <h2>Nearby Hospitals</h2>
        {nearbyHospitals.length > 0 ? (
          <ul>
            {nearbyHospitals.map((hospital, index) => (
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

      {/* Nearby Entertainment Section */}
      <div className="nearby-locations">
        <h2>Nearby Entertainment</h2>
        {nearbyEntertainment.length > 0 ? (
          <ul>
            {nearbyEntertainment.map((place, index) => (
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

export default HealthcareDetail;
