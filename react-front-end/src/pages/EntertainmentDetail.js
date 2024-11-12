import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './EntertainmentDetail.css'; 
import axios from 'axios';

const EntertainmentDetail = () => {
  const { state: entertainment } = useLocation();
  const [hospitals, setHospitals] = useState([]);
  const [nursinghomes, setNursinghomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchEntertainment = async () => {
    try {
      const response = await axios.get('https://api.senioruplift.me/api/entertainments/');
      if (response.data) {
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
      navigate('/notfound');
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

      <div className="entertainment-description">
        <p>
          Experience an exciting event in {entertainment.city} at {entertainment.location || "a venue yet to be announced"}. This event, categorized under {entertainment.category || "a currently unspecified category"}, promises an engaging and memorable experience for all attendees. Whether you’re looking to explore something new or revisit a favorite pastime, this event offers an opportunity for fun and entertainment. 

          Tickets are priced at {entertainment.cost || "a rate that will be shared soon"}, making it accessible for a variety of audiences. Scheduled for {entertainment.event_time || "a time yet to be determined"}, you’ll want to mark your calendar once the details are confirmed. Gather your friends or family and come enjoy a day or evening of entertainment that’s bound to be lively and memorable. Stay tuned for more details to ensure you don't miss out on this exciting occasion!
        </p>
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
                  City: {hospital.city || "City not available"}<br />
                  Discharges: {hospital.discharges || "Discharges not available"}
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
