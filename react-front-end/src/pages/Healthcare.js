import React, { useState, useEffect } from 'react';
import './Healthcare.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader/Loader';

const Healthcare = () => {
  const [healthcareData, setHealthcareData] = useState([]);
  const [filters, setFilters] = useState({ sort: 'id', descend: 'no', search: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const centersPerPage = 9;
  const navigate = useNavigate();

  const fetchHealthcareCenters = async (updatedFilters) => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams(updatedFilters).toString();
      const response = await axios.get(`https://api.senioruplift.me/api/healthcenters/?${queryParams}`);
      setHealthcareData(response.data || []);
    } catch (err) {
      setError('Error fetching data, please try again later');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealthcareCenters(filters);
  }, [filters]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = () => {
    setFilters((prevFilters) => ({ ...prevFilters, search: searchQuery }));
    setCurrentPage(1);
  };

  const handleDropdownChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleCardClick = (center) => {
    navigate(`/healthcenters/${center.id}`, { state: center });
  };

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
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="healthcare-container">
      <h1 className="healthcare-title">Find Healthcare Centers Near You</h1>
      <p className="healthcare-description">
        Explore top-rated healthcare centers in Texas. Get detailed information about proximity, services, and ratings.
      </p>
      <form className="filter-form" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          name="search"
          placeholder="Search by name, city, etc."
          value={searchQuery}
          onChange={handleSearchChange}
          className="filter-input"
        />
        <button type="button" onClick={handleSearchClick} className="filter-button">
          Search
        </button>
        <select
          name="sort"
          value={filters.sort}
          onChange={handleDropdownChange}
          className="filter-select"
        >
          <option value="id">Sort by ID</option>
          <option value="name">Sort by Name</option>
          <option value="city">Sort by City</option>
          <option value="beds">Sort by Beds</option>
          <option value="revenue">Sort by Revenue</option>
        </select>
        <select
          name="descend"
          value={filters.descend}
          onChange={handleDropdownChange}
          className="filter-select"
        >
          <option value="no">Ascending</option>
          <option value="yes">Descending</option>
        </select>
      </form>
      <div className="healthcare-list">
        {currentCenters.map((center) => (
          <div
            key={center.id}
            className="healthcare-item"
            onClick={() => handleCardClick(center)}
            style={{ cursor: 'pointer' }}
          >
            {center.image_url ? (
              <img
                src={center.image_url}
                alt={center.name}
                className="healthcare-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '';
                }}
              />
            ) : (
              <h3 className="fallback-name">{center.name}</h3>
            )}
            <h3>{center.name}</h3>
            <p>Location: {center.city}</p>
            <p>Beds: {center.beds || 'N/A'}</p>
            <p>Discharges: {center.discharges || 'N/A'}</p>
            <p>Patient Days: {center.patient_days || 'N/A'}</p>
            <p>Revenue: {center.revenue ? `$${center.revenue.toLocaleString()}` : 'N/A'}</p>
          </div>
        ))}
      </div>
      <div className="results-info">
        <p>
          Showing {indexOfFirstCenter + 1} - {Math.min(indexOfLastCenter, healthcareData.length)} of{' '}
          {healthcareData.length} results
        </p>
      </div>
      <div className="pagination-controls">
        <button onClick={prevPage} disabled={currentPage === 1} className="pagination-button">
          Back
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={nextPage} disabled={currentPage === totalPages} className="pagination-button">
          Next
        </button>
      </div>
    </div>
  );
};

export default Healthcare;
