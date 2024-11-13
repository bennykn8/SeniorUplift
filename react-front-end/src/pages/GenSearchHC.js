import React, { useState, useEffect } from 'react';
import './Healthcare.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import SubNavbar from './SubNavbar';

const GeneralSearch = () => {
  const [healthcareData, setHealthcareData] = useState([]);
  const [filters, setFilters] = useState({ sort: 'id', descend: 'no', search: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const centersPerPage = 9;
  const navigate = useNavigate();
  const location = useLocation();

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
    const queryParams = new URLSearchParams(location.search);
    const search = queryParams.get('query') || '';
    setSearchQuery(search);
    fetchHealthcareCenters(filters);
  }, [filters, location.search]);

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

  // Filter healthcareData based on searchQuery
  const filteredCenters = healthcareData.filter(
    (center) =>
      center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      center.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastCenter = currentPage * centersPerPage;
  const indexOfFirstCenter = indexOfLastCenter - centersPerPage;
  const currentCenters = filteredCenters.slice(indexOfFirstCenter, indexOfLastCenter);
  const totalPages = Math.ceil(filteredCenters.length / centersPerPage);

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

  const highlightSearchTerm = (text) => {
    if (!searchQuery) return text;
    const regex = new RegExp(`(${searchQuery})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="highlight">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="healthcare-container">
      <SubNavbar />
      <h1 className="healthcare-title">Find Healthcare Centers Near You</h1>
      <p className="healthcare-description">
        Explore top-rated healthcare centers in Texas. Get detailed information about proximity, services, and ratings.
      </p>
      <form className="filter-form" onSubmit={(e) => e.preventDefault()}>
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
            <h3>{highlightSearchTerm(center.name)}</h3>
            <p>Location: {highlightSearchTerm(center.city)}</p>
            <p>Beds: {center.beds || 'N/A'}</p>
            <p>Discharges: {center.discharges || 'N/A'}</p>
            <p>Patient Days: {center.patient_days || 'N/A'}</p>
            <p>Revenue: {center.revenue ? `$${center.revenue.toLocaleString()}` : 'N/A'}</p>
          </div>
        ))}
      </div>
      <div className="results-info">
        <p>
          Showing {indexOfFirstCenter + 1} - {Math.min(indexOfLastCenter, filteredCenters.length)} of{' '}
          {filteredCenters.length} results
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

export default GeneralSearch;
