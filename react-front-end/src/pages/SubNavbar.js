// SubNavbar.js
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './SubNavbar.css';

const SubNavbar = () => {
  const location = useLocation();

  // Extract the current search query from the URL
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('query') || '';

  return (
    <div className="sub-navbar">
      <div className="container d-flex justify-content-center">
        <NavLink to={`/search/healthcenters?query=${searchQuery}`} className="sub-nav-button">
          Healthcare
        </NavLink>
        <NavLink to={`/search/nursinghomes?query=${searchQuery}`} className="sub-nav-button">
          Nursing Homes
        </NavLink>
        <NavLink to={`/search/entertainment?query=${searchQuery}`} className="sub-nav-button">
          Entertainment
        </NavLink>
      </div>
    </div>
  );
};

export default SubNavbar;
