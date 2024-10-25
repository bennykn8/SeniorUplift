import React, { useState, useEffect } from 'react';
import './Healthcare.css';  
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader/Loader';

const Healthcare = () => {
  const [healthcareData, setHealthcareData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const centersPerPage = 9;
  const navigate = useNavigate();

  const fetchHealthcareCenters = async () => {
    try {
      const response = await axios.get('https://api.senioruplift.me/api/healthcenters/');
      if (response.data) {
        setHealthcareData(response.data); 
      }
    } catch (err) {
      setError('Error fetching data, please try again later');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealthcareCenters();
  }, []);

  const indexOfLastCenter = currentPage * centersPerPage;
  const indexOfFirstCenter = indexOfLastCenter - centersPerPage;
  const currentCenters = healthcareData.slice(indexOfFirstCenter, indexOfLastCenter);

  const totalPages = Math.ceil(healthcareData.length / centersPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return <Loader/>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleCardClick = (center) => {
    navigate(`/healthcenters/${center.id}`, { state: center });  
  };

  const startItem = indexOfFirstCenter + 1;
  const endItem = Math.min(indexOfLastCenter, healthcareData.length);

  return (
    <div className="healthcare-container">
      <h1 className="healthcare-title">Find Healthcare Centers Near You</h1>
      <p className="healthcare-description">
        Explore top-rated healthcare centers in Texas. Get detailed information about proximity, services, and ratings.
      </p>

      <div className="healthcare-list">
        {currentCenters.map((center, index) => (
          <div key={index} className="healthcare-item" onClick={() => handleCardClick(center)} style={{ cursor: 'pointer' }}>
            {center.image_url ? (
              <img 
                src={center.image_url} 
                alt={center.name} 
                className="healthcare-image" 
                onError={(e) => { e.target.onerror = null; e.target.src = ""; }}
              />
            ) : (
              <h3 className="fallback-name">{center.name}</h3>
            )}

            <h3>{center.name}</h3>
            <p>Location: {center.city}</p>
            <p>Beds: {center.beds || "N/A"}</p>
            <p>Discharges: {center.discharges || "N/A"}</p>
            <p>Patient Days: {center.patient_days || "N/A"}</p>
          </div>
        ))}
      </div>

      <div className="results-info">
        <p>
          Showing {startItem} - {endItem} of {healthcareData.length} results
        </p>
      </div>

      <div className="pagination-controls">
        <button onClick={prevPage} disabled={currentPage === 1} className="pagination-button">
          Back
        </button>
        <span> Page {currentPage} of {totalPages} </span>
        <button onClick={nextPage} disabled={currentPage === totalPages} className="pagination-button">
          Next
        </button>
      </div>
    </div>
  );
};

export default Healthcare;
