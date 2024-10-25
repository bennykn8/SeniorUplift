import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './EntertainmentDetail.css'; 
import axios from 'axios';

const EntertainmentDetail = () => {
  const { state: entertainment } = useLocation();
  const [entertainmentData, setEntertainmentData] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [nursinghomes, setNursinghomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchEntertainment = async () => {
    try {
      const response = await axios.get('https://api.senioruplift.me/api/entertainments/');
      if (response.data) {
        setEntertainmentData(response.data);
        // Assuming entertainment ID is available and used to match details
        const currentEntertainment = response.data.find(e => e.id === entertainment.id);
        if (currentEntertainment) {
          setHospitals(currentEntertainment.healthcenter || []);
          setNursinghomes(currentEntertainment.nursinghome || []);
        }
      }
    } catch (err) {
      setError('Error fetching data, please try again later');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!entertainment) {
      navigate('/notfound'); // Redirect or handle the case where no entertainment is provided
    } else {
      fetchEntertainment();
    }
  }, [entertainment, navigate]);

  if (!entertainment || loading) {
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

      {/* Display nearby hospitals */}
      <div className="nearby-locations">
        <h2>Nearby Hospitals</h2>
        {hospitals.length > 0 ? (
          <ul>
            {hospitals.slice(0, 3).map((hospital, index) => (
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

      {/* Display nearby nursing homes */}
      <div className="nearby-locations">
        <h2>Nearby Nursing Homes</h2>
        {nursinghomes.length > 0 ? (
          <ul>
            {nursinghomes.slice(0, 3).map((nursinghome, index) => (
                <li key={index}
                    onClick={() => navigate(`/nursinghomes/${nursinghome.id}`, { state: nursinghome })}
                    style={{ cursor: 'pointer' }}>
                  <strong>{nursinghome.name}</strong><br />
                  {nursinghome.address}<br />
                  Rating: {nursinghome.rating ? `${nursinghome.rating}/5` : "No rating available"}<br />
                  Phone: {nursinghome.phone || "Phone not available"}
                </li>
            ))}
          </ul>
        ) : <p>No nearby nursing homes found.</p>}
      </div>

    </div>
  );
};

export default EntertainmentDetail;
