import React, { useState, useEffect } from 'react';
import './NursingHomes.css';  
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NursingHomes = () => {
  const [nursingHomesData, setNursingHomesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const homesPerPage = 9;

  const fetchNursingHomes = async () => {
    try {
      const response = await axios.get('https://api.senioruplift.me//api/nursinghomes/');
      if (response.data) {
        setNursingHomesData(response.data);  // Directly set response.data
      }
    } catch (err) {
      setError('Error fetching data, please try again later');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNursingHomes();
  }, []);

  const indexOfLastHome = currentPage * homesPerPage;
  const indexOfFirstHome = indexOfLastHome - homesPerPage;
  const currentHomes = nursingHomesData.slice(indexOfFirstHome, indexOfLastHome);

  const totalPages = Math.ceil(nursingHomesData.length / homesPerPage);

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
    return <div>Loading nursing homes...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleCardClick = (home) => {
    navigate(`/nursinghomes/${home.id}`, { state: home });  // Pass the entire home object
  };

  return (
    <div className="nursing-homes-container">
      <h1 className="nursing-homes-title">Find Nursing Homes Near You</h1>
      <p className="nursing-homes-description">
        Explore top-rated nursing homes in Texas. Get detailed information about proximity, services, and ratings.
      </p>

      <div className="nursing-homes-list">
        {currentHomes.map((home, index) => (
          <div key={index} className="nursing-home-item" onClick={() => handleCardClick(home)} style={{ cursor: 'pointer' }}>
            {home.image_url ? (
              <img src={home.image_url} alt={home.name} className="nursing-home-image" />
            ) : (
              <img src="default-image-url.jpg" alt="No Image Available" className="nursing-home-image" />
            )}

            <h3>{home.name}</h3>
            <p>Location: {home.address}</p>
            <p>Rating: {home.rating ? `${home.rating}/5` : "No rating available"}</p>
            <p>Phone: {home.phone || "Phone not available"}</p>
            <p>Website: <a href={home.website} target="_blank" rel="noopener noreferrer">{home.website || "Website not available"}</a></p>
            <p>Hours: {home.hours || "No hours available"}</p>
          </div>
        ))}
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

export default NursingHomes;
