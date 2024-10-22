import React, { useState, useEffect } from 'react';
import './NursingHomes.css';
import axios from 'axios'; 

const NursingHomes = () => {
  const [nursingHomesData, setNursingHomesData] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  const homesPerPage = 9;

  const fetchNursingHomes = async () => {
    try {
      setLoading(true); 
      const response = await axios.get('http://localhost:5000/api/nursinghomes/google'); 
      console.log("Response data:", response.data.nursing_homes); // Log response
      if (response.data.nursing_homes) {
        setNursingHomesData(response.data.nursing_homes); 
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
  console.log("Current homes to display:", currentHomes);



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

  return (
    <div className="nursing-homes-container">
      <h1 className="nursing-homes-title">Find Nursing Homes Near You</h1>
      <p className="nursing-homes-description">
        Explore top-rated nursing homes in Texas. Get detailed information about proximity, services, and ratings.
      </p>
      
      {/* Display current nursing homes */}
      <div className="nursing-homes-list">
        {currentHomes.map((home, index) => (
          <div key={index} className="nursing-home-item">
            <h3>{home.name}</h3>
            <p>Location: {home.address}</p>
            <p>Rating: {home.rating ? `${home.rating}/5` : "No rating available"}</p>
            <p>Phone: {home.phone || "Phone not available"}</p>
            <p>Website: <a href={home.website} target="_blank" rel="noopener noreferrer">{home.website || "Website not available"}</a></p>
            <p>Hours: {home.hours.length ? home.hours.join(', ') : "No hours available"}</p>
          </div>
        ))}
      </div>

      <div className="pagination-controls">
        <button 
          onClick={prevPage} 
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Back
        </button>
        <span> Page {currentPage} of {totalPages} </span>
        <button 
          onClick={nextPage} 
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default NursingHomes;
