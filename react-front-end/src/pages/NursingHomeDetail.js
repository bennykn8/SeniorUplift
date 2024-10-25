import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './NursingHomeDetail.css';  
import axios from 'axios';

const NursingHomeDetail = () => {
  const { state: home } = useLocation();
  const [nursingHomesData, setNursingHomesData] = useState([]);
  const [nearbyHospital, setHospitals] = useState([]);
  const [nearbyEntertainment, setEntertainment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchNursingHomes = async () => {
    try {
      const response = await axios.get('https://api.senioruplift.me/api/nursinghomes/');
      if (response.data) {
        setNursingHomesData(response.data);
        console.log(nursingHomesData)
        const currentNursingHome = response.data.find(e => e.id === home.id);
        if (currentNursingHome) {
          setHospitals(currentNursingHome.healthcenter || []);
          setEntertainment(currentNursingHome.entertainment || []);
        }
      }
    } catch (err) {
      setError('Error fetching data, please try again later');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!home) {
      navigate('/notfound'); // Redirect or handle the case where no entertainment is provided
    } else {
      fetchNursingHomes();
    }
  }, [home, navigate]);

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
        {nearbyHospital.length > 0 ? (
          <ul>
            {nearbyHospital.slice(0, 3).map((hospital, index) => (
                <li key={index}
                    onClick={() => navigate(`/healthcenters/${hospital.id}`, { state: hospital })}
                    style={{ cursor: 'pointer' }}>
                  <strong>{hospital.name}</strong><br />
                  {hospital.address}<br />
                  Rating: {hospital.rating ? `${hospital.rating}/5` : "No rating available"}<br />
                  Phone: {hospital.phone || "Phone not available"}
                </li>
            ))}
          </ul>
        ) : <p>No nearby hospitals found.</p>}
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
    </div>
  );
};

export default NursingHomeDetail;
