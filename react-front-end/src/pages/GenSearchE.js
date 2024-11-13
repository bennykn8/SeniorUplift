import React, { useState, useEffect } from 'react';
import './Entertainment.css'; 
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import SubNavbar from './SubNavbar';

const GSE = () => {
  const [entertainmentData, setEntertainmentData] = useState([]);
  const [filters, setFilters] = useState({ sort: 'id', descend: 'no', search: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 12;
  const navigate = useNavigate();
  const location = useLocation();

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
    const queryParams = new URLSearchParams(location.search);
    const search = queryParams.get('query') || '';
    setSearchQuery(search);
    fetchEntertainment(filters);
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

  const handleCardClick = (item) => {
    navigate(`/entertainments/${item.id}`, { state: item });
  };

  const filteredEntertains = entertainmentData.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.cost.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.event_time.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredEntertains.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredEntertains.length / itemsPerPage);

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
  const endItem = Math.min(indexOfLastItem, filteredEntertains.length);

  return (
    <div className="entertainment-container">
      <SubNavbar />
      <h1 className="entertainment-title">Find Entertainment Near You</h1>
      <p className="entertainment-description">
        Explore engaging entertainment options for seniors in Texas. Find nearby events, activities, and places that provide joy and fun.
      </p>

      <form className="filter-form" onSubmit={(e) => e.preventDefault()}>
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
            <p>Venue: {highlightSearchTerm(item.location) || 'Venue not available'}</p>
            <p>Cost: {highlightSearchTerm(item.cost) || 'Cost not available'}</p>
            <p>Category: {highlightSearchTerm(item.category) || 'Category not available'}</p>
            <p>Time: {highlightSearchTerm(item.event_time) || 'Time not available'}</p>
          </div>
        ))}
      </div>

      <div className="results-info">
        <p>
          Showing {startItem} - {endItem} of {filteredEntertains.length} results
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

export default GSE;
