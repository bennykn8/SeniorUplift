import React, { useState, useEffect } from 'react';
import './Entertainment.css'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader/Loader';

const Entertainment = () => {
  const [entertainmentData, setEntertainmentData] = useState([]);
  const [filters, setFilters] = useState({ sort: 'id', descend: 'no', search: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 9;
  const navigate = useNavigate();

  const fetchEntertainment = async (updatedFilters) => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams(updatedFilters).toString();
      const response = await axios.get(`https://api.senioruplift.me/api/entertainments/?${queryParams}`);
      setEntertainmentData(response.data || []);
    } catch (err) {
      setError('Error fetching data, please try again later');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntertainment(filters);
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

  const handleCardClick = (item) => {
    navigate(`/entertainments/${item.id}`, { state: item });
  };

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

  const startItem = indexOfFirstItem + 1;
  const endItem = Math.min(indexOfLastItem, entertainmentData.length);

  return (
    <div className="entertainment-container">
      <h1 className="entertainment-title">Find Entertainment Near You</h1>
      <p className="entertainment-description">
        Explore engaging entertainment options for seniors in Texas. Find nearby events, activities, and places that provide joy and fun.
      </p>

      <form className="filter-form" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          name="search"
          placeholder="Search by title, city, etc."
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
          <option value="title">Sort by Title</option>
          <option value="city">Sort by City</option>
          <option value="cost">Sort by Cost</option>
          <option value="category">Sort by Category</option>
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

      <div className="entertainment-list">
        {currentItems.map((item) => (
          <div
            key={item.id}
            className="entertainment-item"
            onClick={() => handleCardClick(item)}
            style={{ cursor: 'pointer' }}
          >
            {item.image_url ? (
              <img src={item.image_url} alt={item.title} className="entertainment-image" />
            ) : (
              <img src="default-image-url.jpg" alt="No Image Available" className="entertainment-image" />
            )}

            <h3>{highlightSearchTerm(item.title)}</h3>
            <p>Location: {highlightSearchTerm(item.city)}</p>
            <p>Venue: {item.location || 'Venue not available'}</p>
            <p>Cost: {item.cost || 'Cost not available'}</p>
            <p>Category: {item.category || 'Category not available'}</p>
            <p>Time: {item.event_time || 'Time not available'}</p>
          </div>
        ))}
      </div>

      <div className="results-info">
        <p>
          Showing {startItem} - {endItem} of {entertainmentData.length} results
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

export default Entertainment;
