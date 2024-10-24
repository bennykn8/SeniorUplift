import React, { useState, useEffect } from 'react';
import './Entertainment.css';  // Assuming you will add the styles here
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Entertainment = () => {
  const [entertainmentData, setEntertainmentData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const itemsPerPage = 9;  // Similar to homesPerPage in NursingHomes.js

  const fetchEntertainment = async () => {
    try {
      const response = await axios.get('https://api.senioruplift.me/api/entertainments/');
      if (response.data) {
        setEntertainmentData(response.data);  // Set fetched entertainment data
      }
    } catch (err) {
      setError('Error fetching data, please try again later');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntertainment();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = entertainmentData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(entertainmentData.length / itemsPerPage);

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
    return <div>Loading entertainment options...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleCardClick = (item) => {
    navigate(`/entertainments/${item.id}`, { state: item });  // Pass the entire item object
  };

  return (
    <div className="entertainment-container">
      <h1 className="entertainment-title">Find Entertainment Near You</h1>
      <p className="entertainment-description">
        Explore engaging entertainment options for seniors in Texas. Find nearby events, activities, and places that provide joy and fun.
      </p>

      <div className="entertainment-list">
        {currentItems.map((item, index) => (
          <div key={index} className="entertainment-item" onClick={() => handleCardClick(item)} style={{ cursor: 'pointer' }}>
            {item.image_url ? (
              <img src={item.image_url} alt={item.title} className="entertainment-image" />
            ) : (
              <img src="default-image-url.jpg" alt="No Image Available" className="entertainment-image" />
            )}

            <h3>{item.title}</h3>
            <p>Location: {item.city}</p>
            <p>Cost: {item.cost || "Cost not available"}</p>
            <p>Category: {item.category || "Category not available"}</p>
            <p>Time: {item.event_time || "Time not available"}</p>
            <p>Website: <a href={item.website} target="_blank" rel="noopener noreferrer">{item.website || "Website not available"}</a></p>
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

export default Entertainment;
