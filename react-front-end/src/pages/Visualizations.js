import React from 'react';
import BarChart from './BarChart';
import HealthCenterBubblePlot from './BubbleChart';
import BubbleMap from './BubbleMap';

const Visualizations = () => {
  const titleStyle = {
    fontSize: '2rem', // Larger font size
    fontWeight: 'bold', // Bold text
    color: '#333', // Darker color for contrast
    textTransform: 'uppercase', // Make the titles uppercase
    margin: '20px 0', // Add spacing above and below
    textDecoration: 'underline', // Add underline for emphasis
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
