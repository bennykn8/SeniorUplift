import React from 'react';
import BarChart from './BarChart';
import HealthCenterBubblePlot from './BubbleChart';
import BubbleMap from './BubbleMap';


const Visualizations = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ marginBottom: '40px' }}> {/* Add margin-bottom */}
        <h1>Event Categories</h1>
        <BarChart />
        <h1>Elderly Homes Locations</h1>
        <BubbleMap />
        <h1>Most Frequent Hospital Locations</h1>
        <HealthCenterBubblePlot />
      </div>
    </div>
  );
};

export default Visualizations;
