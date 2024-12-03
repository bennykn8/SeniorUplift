import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import axios from 'axios';

const BarChart = () => {
  const svgRef = useRef();
  const [data, setData] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://cs373backend.elderhelpertexas.me/events/'
        );
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (data.length) {
      const eventCategories = data
        .map((event) => event.event_category)
        .filter((category) => category);

      const counts = eventCategories.reduce((acc, category) => {
        acc[category] = (acc[category] || 0) + 1;
        return acc;
      }, {});

      const countsArray = Object.keys(counts).map((key) => ({
        category: key,
        count: counts[key],
      }));
      setCategoryCounts(countsArray);
    }
  }, [data]);

  useEffect(() => {
    if (!categoryCounts.length) return;

    const svg = d3.select(svgRef.current);
    const width = 900;
    const height = 500;
    const margin = { top: 30, right: 30, bottom: 70, left: 60 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    svg.selectAll('*').remove();

    const x = d3
      .scaleBand()
      .domain(categoryCounts.map((d) => d.category))
      .range([0, innerWidth])
      .padding(0.2);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(categoryCounts, (d) => d.count)])
      .range([innerHeight, 0]);

    const g = svg
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    g.selectAll('rect')
      .data(categoryCounts)
      .join('rect')
      .attr('x', (d) => x(d.category))
      .attr('y', (d) => y(d.count))
      .attr('width', x.bandwidth())
      .attr('height', (d) => innerHeight - y(d.count))
      .attr('fill', 'steelblue');

    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end');

    g.append('g').call(d3.axisLeft(y));

    g.append('text')
      .attr('x', innerWidth / 2)
      .attr('y', innerHeight + margin.bottom - 10)
      .attr('text-anchor', 'middle')
      .text('Event Categories');

    g.append('text')
      .attr('x', -innerHeight / 2)
      .attr('y', -margin.left + 20)
      .attr('text-anchor', 'middle')
      .attr('transform', 'rotate(-90)')
      .text('Number of Events');
  }, [categoryCounts]);

  return (
    <div>
      <h1>Event Categories Bar Chart</h1>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default BarChart;
