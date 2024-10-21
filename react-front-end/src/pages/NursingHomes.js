import React, { useState, useEffect } from 'react';
import './NursingHomes.css';
import axios from 'axios'; // Import Axios for API calls

const NursingHomes = () => {
  const [nursingHomesData, setNursingHomesData] = useState([]); // State for nursing homes data
  const [currentPage, setCurrentPage] = useState(1); // State for pagination
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const homesPerPage = 9; // Number of homes to display per page

  // Function to fetch data from the API
  const fetchNursingHomes = async () => {
    try {
      setLoading(true); // Set loading to true while fetching data
      const response = await axios.get('http://localhost:3000/api/nursinghomes/google'); // Fetch all cities' nursing homes
      if (response.data.nursing_homes) {
        setNursingHomesData(response.data.nursing_homes); // Set the data from API response
      }
    } catch (err) {
      setError('Error fetching data, please try again later');
    } finally {
      setLoading(false); // Set loading to false when done
    }
  };
  
  // Example of calling fetchNursingHomes with a user-selected city
  fetchNursingHomes("Dallas");  // You can dynamically change this based on user input
  

  // Call fetchNursingHomes when the component mounts
  useEffect(() => {
    fetchNursingHomes(); // Fetch data when the component loads
  }, []);

  // Get current homes for pagination
  const indexOfLastHome = currentPage * homesPerPage;
  const indexOfFirstHome = indexOfLastHome - homesPerPage;
  const currentHomes = nursingHomesData.slice(indexOfFirstHome, indexOfLastHome);

  // Page navigation
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
    return <div>Loading nursing homes...</div>; // Show loading message while fetching data
  }

  if (error) {
    return <div>{error}</div>; // Show error message if there's an error
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
            <p>Location: {home.formatted_address}</p>
            <p>Rating: {home.rating ? `${home.rating}/5` : "No rating available"}</p>
            <p>Phone: {home.formatted_phone_number || "Phone not available"}</p>
            <p>Website: <a href={home.website} target="_blank" rel="noopener noreferrer">{home.website || "Website not available"}</a></p>
          </div>
        ))}
      </div>

      {/* Pagination controls */}
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
