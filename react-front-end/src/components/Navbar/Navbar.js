import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaHospitalUser, FaSearch } from "react-icons/fa";

import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/healthcenters?query=${searchQuery.trim()}`);
    }
    setSearchQuery('');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-info">
      <div className="container-fluid">
        <FaHospitalUser className='hospital-logo' />
        <NavLink className="navbar-brand text-dark" to="/">
          SeniorUpLift
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
          aria-controls="navbarSupportedContent"
          aria-expanded={isOpen ? "true" : "false"}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/about"
                style={({ isActive }) => ({ color: isActive ? 'dark' : 'dark' })}
              >
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/healthcare"
                style={({ isActive }) => ({ color: isActive ? 'dark' : 'dark' })}
              >
                Healthcare
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/nursing-homes"
                style={({ isActive }) => ({ color: isActive ? 'dark' : 'dark' })}
              >
                Nursing Homes
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/entertainment"
                style={({ isActive }) => ({ color: isActive ? 'dark' : 'dark' })}
              >
                Entertainment
              </NavLink>
            </li>
          </ul>
          <form className="d-flex search-form" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              className="form-control me-2"
              placeholder="Search"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-outline-dark" type="submit">
              <FaSearch />
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
