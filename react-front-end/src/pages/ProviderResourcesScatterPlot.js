import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import axios from 'axios';

const ResourcesScatterPlot = () => {
  const svgRef = useRef();

  useEffect(() => {
    const drawScatterPlot = async () => {
      try {
        // Fetch Resources data from the API
        const response = await axios.get('https://api.mentalhealthtexas.me/get-resources');
        const resources = response.data;

        // Example assumption: Adding age ranges for the resources
        const ageRanges = [
          '0-10', '11-20', '21-30', '31-40', '41-50', '51-60', '61-70', '71+'
        ];

        // Assume age ranges are included in the dataset or add a placeholder
        const updatedResources = resources.map((resource) => ({
          ...resource,
          ageRange: ageRanges[Math.floor(Math.random() * ageRanges.length)] 
        }));

        // Dimensions and margins
        const baseWidth = 150;
        const height = 400; 
        const marginTop = 30;
        const marginRight = 30;
        const marginBottom = 70;
        const marginLeft = 70;

        // Extract unique values for counties and age ranges
        const counties = [...new Set(updatedResources.map((d) => d.county))];
        const ageRangeCategories = ageRanges; 

        const width = counties.length * baseWidth; 

        // Create scales for x and y
        const x = d3
          .scaleBand()
          .domain(counties)
          .range([marginLeft, width - marginRight])
          .padding(0.1);

        const y = d3
          .scaleBand()
          .domain(ageRangeCategories)
          .range([height - marginBottom, marginTop])
          .padding(0.1);

        // Clear previous SVG content
        d3.select(svgRef.current).selectAll('*').remove();

        // Create the SVG container
        const svg = d3
          .select(svgRef.current)
          .attr('width', width)
          .attr('height', height)
          .attr('viewBox', `0 0 ${width} ${height}`)
          .attr('style', 'font: 10px sans-serif;');

        // Create x-axis
        svg
          .append('g')
          .attr('transform', `translate(0,${height - marginBottom})`)
          .call(d3.axisBottom(x).tickSize(0))
          .call((g) =>
            g
              .selectAll('text')
              .attr('transform', 'rotate(-45)')
              .attr('text-anchor', 'end')
          )
          .call((g) => g.select('.domain').remove());

        // Add x-axis title
        svg
          .append('text')
          .attr('x', (width - marginLeft - marginRight) / 2 + marginLeft)
          .attr('y', height - 30)
          .attr('fill', 'currentColor')
          .attr('text-anchor', 'middle')
          .style('font-size', '14px')
          .text('County');

        // Create y-axis
        svg
          .append('g')
          .attr('transform', `translate(${marginLeft},0)`)
          .call(d3.axisLeft(y).tickSize(0))
          .call((g) => g.select('.domain').remove());

        // Add y-axis title
        svg
          .append('text')
          .attr('x', -height / 2)
          .attr('y', 15)
          .attr('transform', 'rotate(-90)')
          .attr('fill', 'currentColor')
          .attr('text-anchor', 'middle')
          .style('font-size', '14px')
          .text('Age Range');

        // Add dots for each resource
        svg
          .append('g')
          .selectAll('circle')
          .data(updatedResources)
          .join('circle')
          .attr('cx', (d) => x(d.county) + x.bandwidth() / 2)
          .attr('cy', (d) => y(d.ageRange) + y.bandwidth() / 2)
          .attr('r', 5) 
          .attr('fill', 'steelblue')
          .attr('stroke', 'white')
          .attr('stroke-width', 1.5)
          .append('title') 
          .text((d) => `Name: ${d.name}\nAddress: ${d.address}\nAge Range: ${d.ageRange}`);

        svg
          .append('g')
          .attr('stroke', 'currentColor')
          .attr('stroke-opacity', 0.1)
          .call((g) =>
            g
              .selectAll('line.x-grid')
              .data(x.domain())
              .join('line')
              .attr('class', 'x-grid')
              .attr('x1', (d) => x(d) + x.bandwidth() / 2)
              .attr('x2', (d) => x(d) + x.bandwidth() / 2)
              .attr('y1', marginTop)
              .attr('y2', height - marginBottom)
          )
          .call((g) =>
            g
              .selectAll('line.y-grid')
              .data(y.domain())
              .join('line')
              .attr('class', 'y-grid')
              .attr('y1', (d) => y(d) + y.bandwidth() / 2)
              .attr('y2', (d) => y(d) + y.bandwidth() / 2)
              .attr('x1', marginLeft)
              .attr('x2', width - marginRight)
          );
      } catch (error) {
        console.error('Error drawing scatter plot:', error);
      }
    };

    drawScatterPlot();
  }, []);

  return (
    <div style={{ overflowX: 'auto' }}>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default ResourcesScatterPlot;
