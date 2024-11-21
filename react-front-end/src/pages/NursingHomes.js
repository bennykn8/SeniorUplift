import React, { useState, useEffect } from 'react';
import './NursingHomes.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader/Loader';

const NursingHomes = () => {
  const [nursingHomesData, setNursingHomesData] = useState([]);
  const [filters, setFilters] = useState({ sort: 'id', descend: 'no', search: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const homesPerPage = 12;
  const navigate = useNavigate();

  const fetchNursingHomes = async (updatedFilters) => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams(updatedFilters).toString();
      const response = await axios.get(`https://api.senioruplift.me/api/nursinghomes/?${queryParams}`);
      setNursingHomesData(response.data || []);
    } catch (err) {
      setError('Error fetching data, please try again later');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNursingHomes(filters);
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

  const handleCardClick = (home) => {
    navigate(`/nursinghomes/${home.id}`, { state: home });
  };

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

  const startItem = indexOfFirstHome + 1;
  const endItem = Math.min(indexOfLastHome, nursingHomesData.length);

  return (
    <div className="nursing-homes-container">
      <h1 className="nursing-homes-title">Find Nursing Homes Near You</h1>
      <p className="nursing-homes-description">
        Explore top-rated nursing homes in Texas. Get detailed information about proximity, services, and ratings.
      </p>

      <form className="filter-form" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          name="search"
          placeholder="Search by name, address, etc."
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
          <option value="address">Sort by Address</option>
          <option value="rating">Sort by Rating</option>
          <option value="city">Sort by City</option>


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

      <div className="nursing-homes-list">
        {currentHomes.map((home) => (
          <div
            key={home.id}
            className="nursing-home-item"
            onClick={() => handleCardClick(home)}
            style={{ cursor: 'pointer' }}
          >
            {home.image_url ? (
              <img src={home.image_url} alt={home.name} className="nursing-home-image" />
            ) : (
              <img src="default-image-url.jpg" alt="No Image Available" className="nursing-home-image" />
            )}

            <h3>{highlightSearchTerm(home.name)}</h3>
            <p>Location: {highlightSearchTerm(home.address)}</p>
            <p>City: {highlightSearchTerm(home.city)}</p>
            <p>Rating: {home.rating ? `${home.rating}/5` : 'No rating available'}</p>
            <p>Phone: {home.phone || 'Phone not available'}</p>
            <p>
              Website:{' '}
              <a href={home.website} target="_blank" rel="noopener noreferrer">
                {home.website || 'Website not available'}
              </a>
            </p>
            <p>Hours: {home.hours || 'No hours available'}</p>
          </div>
        ))}
      </div>

      <div className="results-info">
        <p>
          Showing {startItem} - {endItem} of {nursingHomesData.length} results
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

export default NursingHomes;