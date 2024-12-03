import React from 'react';
import BarChart from './BarChart';
import HealthCenterBubblePlot from './BubbleChart';


const Visualizations = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ marginBottom: '40px' }}> {/* Add margin-bottom */}
        <h1>Event Categories</h1>
        <BarChart />
        <h1>Elderly Homes City Ratings</h1>
        <h1>Most Frequent Hospital Locations</h1>
        <HealthCenterBubblePlot />
      </div>
    </div>
  );
};

export default Visualizations;
