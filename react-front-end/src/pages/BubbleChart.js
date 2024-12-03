import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import axios from 'axios';

const HealthCenterBubblePlot = () => {
  const chartRef = useRef();
  const width = 1000;
  const height = 600;
  const margin = { top: 50, right: 40, bottom: 60, left: 60 }; // Increased top margin
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const TEXAS_CITIES = ['amarillo', 'arlington', 'austin', 'brownsville', 'carrollton', 
                        'corpus-christi', 'dallas', 'denton', 'el-paso', 'fort-worth', 'frisco', 
                        'garland', 'grand-prairie', 'houston', 'irving', 'killeen', 'laredo', 
                        'lubbock', 'mcallen', 'mckinney', 'mesquite-city', 'midland', 'pasadena', 
                        'plano', 'san-antonio', 'waco'];

  const url = `https://api.senioruplift.me/api/healthcenters/`;
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        const filteredData = response.data.filter(center => 
          TEXAS_CITIES.includes(center.city.toLowerCase())
        );
        setData(filteredData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (chartRef.current && data.length) {
      drawChart();
    }
  }, [data]);

  const drawChart = () => {
    d3.select(chartRef.current).selectAll('svg').remove();

    const groupedData = d3.group(data, d => d.city);
    const cityTotals = Array.from(groupedData, ([city, values]) => ({
      city,
      totalBeds: d3.sum(values, d => d.beds || 0),
      totalCenters: values.length,
    }));

    const radiusScale = d3.scaleSqrt()
      .domain([0, d3.max(cityTotals, d => d.totalBeds)])
      .range([5, 40]);

    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const xScale = d3.scaleBand()
      .domain(cityTotals.map(d => d.city))
      .range([0, innerWidth])
      .padding(0.2);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(cityTotals, d => d.totalCenters) * 1.1]) // Add padding to prevent clipping
      .range([innerHeight, 0]);

    svg.append('g')
      .call(d3.axisLeft(yScale).tickFormat(d3.format("~s")));

    svg.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale).tickFormat(d => d).tickSizeOuter(0))
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end');

    svg.selectAll('.bubble')
      .data(cityTotals)
      .enter()
      .append('circle')
      .attr('class', 'bubble')
      .attr('cx', d => xScale(d.city) + xScale.bandwidth() / 2)
      .attr('cy', d => yScale(d.totalCenters))
      .attr('r', d => radiusScale(d.totalBeds))
      .style('fill', 'steelblue')
      .style('opacity', 0.7);

    svg.selectAll('.label')
      .data(cityTotals)
      .enter()
      .append('text')
      .attr('x', d => xScale(d.city) + xScale.bandwidth() / 2)
      .attr('y', d => yScale(d.totalCenters) + 4) // Slight offset to center text
      .attr('text-anchor', 'middle')
      .style('fill', 'white')
      .style('font-size', '10px')
      .text(d => d.totalCenters);

    svg.append('text')
      .attr('x', innerWidth / 2)
      .attr('y', -20) // Adjusted position for title
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .text('Health Centers by City and Beds');
  };

  return <div ref={chartRef}></div>;
};

export default HealthCenterBubblePlot;
