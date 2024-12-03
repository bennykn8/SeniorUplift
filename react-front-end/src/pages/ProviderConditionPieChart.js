import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import axios from 'axios';

const ConditionsPieChart = () => {
  const chartRef = useRef();
  const width = 928;
  const height = Math.min(width, 500);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.mentalhealthtexas.me/get-conditions');
        const apiData = response.data;

        // Process data to group by age_group
        const groupedData = d3.rollups(
          apiData,
          v => v.length, 
          d => d.age_group
        ).map(([age_group, value]) => ({ age_group, value }));

        setData(groupedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data.length) {
      drawChart();
    }
  }, [data]);

  const drawChart = () => {
    d3.select(chartRef.current).selectAll('svg').remove();

    // Create the color scale
    const color = d3.scaleOrdinal()
      .domain(data.map(d => d.age_group))
      .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), data.length).reverse());

    // Create the pie layout and arc generator
    const pie = d3.pie()
      .sort(null)
      .value(d => d.value);

    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(Math.min(width, height) / 2 - 1);

    const labelArc = d3.arc()
      .innerRadius(Math.min(width, height) / 4)
      .outerRadius(Math.min(width, height) / 2 - 50);

    const arcs = pie(data);

    // Collision detection setup
    const labelPositions = [];

    // Create the SVG container
    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [-width / 2, -height / 2, width, height])
      .attr('style', 'max-width: 100%; height: auto; font: 10px sans-serif;');

    // Add a sector path for each value
    svg.append('g')
      .attr('stroke', 'white')
      .selectAll('path')
      .data(arcs)
      .join('path')
      .attr('fill', d => color(d.data.age_group))
      .attr('d', arc)
      .append('title')
      .text(d => `${d.data.age_group}: ${d.data.value.toLocaleString('en-US')}`);

    // Add labels for all slices
    svg.append('g')
      .attr('text-anchor', 'middle')
      .selectAll('text')
      .data(arcs)
      .join('text')
      .attr('transform', d => {
        const [x, y] = labelArc.centroid(d);

        // Adjust label position dynamically to avoid overlap
        let adjustedY = y;
        labelPositions.forEach(existing => {
          if (Math.abs(existing.y - y) < 14) { 
            adjustedY = y + (y > 0 ? 14 : -14);
          }
        });
        labelPositions.push({ x, y: adjustedY });

        return `translate(${x}, ${adjustedY})`;
      })
      .style('font-size', '10px')
      .text(d => `${d.data.age_group}: ${d.data.value.toLocaleString('en-US')}`);
  };

  return <div ref={chartRef}></div>;
};

export default ConditionsPieChart;
