import React from 'react';
import './Loader.css'; // make sure the path matches where your CSS file is saved

const Loader = () => {
  return (
    <div className="loader">
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </div>
  );
};

export default Loader;
