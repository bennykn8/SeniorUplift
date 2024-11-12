import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './HealthcareDetail.css';

const HealthcareDetail = () => {
  const { state: center } = useLocation();
  const [nearbyNursingHomes, setNearbyNursingHomes] = useState([]);
  const [nearbyEntertainment, setNearbyEntertainment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchHealthcareCenters = async () => {
    try {
      const response = await axios.get('https://api.senioruplift.me/api/healthcenters/');
      if (response.data) {
        const currentCenter = response.data.find(hc => hc.id === center.id);
        if (currentCenter) {
          setNearbyNursingHomes(currentCenter.nursinghome || []);
          setNearbyEntertainment(currentCenter.entertainment || []);
        }
      }
    } catch (err) {
      setError('Error fetching data, please try again later');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!center) {
      navigate('/notfound'); // Redirect or handle the case where no center is provided
    } else {
      fetchHealthcareCenters();
    }
  }, [center, navigate]);

  if (!center || loading) {
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
          Located in {center.city}, this healthcare center offers a range of services and facilities, including a bed capacity of {center.beds || "N/A"}. With {center.discharges || "no discharge data available"} recorded discharges and {center.patient_days || "N/A"} patient days, the center serves a significant number of patients each year. The center generates an annual revenue of {center.revenue ? `$${center.revenue.toLocaleString()}` : "undisclosed"}.
        </p>
      </div>


      {/* Display nearby entertainment */}
      <div className="nearby-locations">
        <h2>Nearby Entertainment</h2>
        {nearbyEntertainment.length > 0 ? (
          <ul>
            {nearbyEntertainment.slice(0, 3).map((entertainment, index) => (
                <li key={index}
                    onClick={() => navigate(`/entertainments/${entertainment.id}`, { state: entertainment })}
                    style={{ cursor: 'pointer' }}>
                  <strong>{entertainment.title}</strong><br />
                  City: {entertainment.city}<br />
                  {entertainment.location}<br />
                  {entertainment.event_time}<br />
                </li>
            ))}
          </ul>
        ) : <p>No nearby entertainment found.</p>}
      </div>

      {/* Display nearby nursing homes */}
      <div className="nearby-locations">
        <h2>Nearby Nursing Homes</h2>
        {nearbyNursingHomes.length > 0 ? (
          <ul>
            {nearbyNursingHomes.slice(0, 3).map((home, index) => (
                <li key={index}
                    onClick={() => navigate(`/nursinghomes/${home.id}`, { state: home })}
                    style={{ cursor: 'pointer' }}>
                  <strong>{home.name}</strong><br />
                  {home.address}<br />
                  Rating: {home.rating ? `${home.rating}/5` : "No rating available"}<br />
                  Phone: {home.phone || "Phone not available"}
                </li>
            ))}
          </ul>
        ) : <p>No nearby nursing homes found.</p>}
      </div>

    </div>
  );
};

export default HealthcareDetail;
