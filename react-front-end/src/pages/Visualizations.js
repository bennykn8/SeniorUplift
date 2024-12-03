import React from 'react';
import BarChart from './BarChart';
import HealthCenterBubblePlot from './BubbleChart';
import BubbleMap from './BubbleMap';

const Visualizations = () => {
  const titleStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#333', 
    textTransform: 'uppercase', 
    margin: '20px 0', 
    textDecoration: 'underline', 
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={titleStyle}>Event Categories</h1>
        <BarChart />
        <h1 style={titleStyle}>Elderly Homes Locations</h1>
        <BubbleMap />
        <h1 style={titleStyle}>Most Frequent Hospital Locations</h1>
        <HealthCenterBubblePlot />
      </div>
    </div>
  );
};

export default Visualizations;
