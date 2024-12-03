import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import axios from 'axios';

const TEXAS_CITIES = [
  'amarillo', 'arlington', 'austin', 'brownsville', 'carrollton',
  'corpus-christi', 'dallas', 'denton', 'el-paso', 'fort-worth', 'frisco',
  'garland', 'grand-prairie', 'houston', 'irving', 'killeen', 'laredo',
  'lubbock', 'mcallen', 'mckinney', 'mesquite-city', 'midland', 'pasadena',
  'plano', 'san-antonio', 'waco'
];

const CITY_COORDINATES = {
  'amarillo': [-101.8313, 35.222],
  'arlington': [-97.1081, 32.7357],
  'austin': [-97.7431, 30.2672],
  'brownsville': [-97.4975, 25.9017],
  'carrollton': [-96.8903, 32.9537],
  'corpus-christi': [-97.3964, 27.8006],
  'dallas': [-96.7969, 32.7767],
  'denton': [-97.1331, 33.2148],
  'el-paso': [-106.485, 31.7619],
  'fort-worth': [-97.3308, 32.7555],
  'frisco': [-96.8236, 33.1507],
  'garland': [-96.6389, 32.9126],
  'grand-prairie': [-96.9978, 32.7459],
  'houston': [-95.3698, 29.7604],
  'irving': [-96.9489, 32.814],
  'killeen': [-97.732, 31.1171],
  'laredo': [-99.5075, 27.5036],
  'lubbock': [-101.8552, 33.5779],
  'mcallen': [-98.2297, 26.2034],
  'mckinney': [-96.6398, 33.1972],
  'mesquite-city': [-96.5992, 32.7668],
  'midland': [-102.0779, 31.9974],
  'pasadena': [-95.2091, 29.6911],
  'plano': [-96.6989, 33.0198],
  'san-antonio': [-98.4936, 29.4241],
  'waco': [-97.1467, 31.5493]
};

const BubbleMap = () => {
  const svgRef = useRef();

  useEffect(() => {
    const drawBubbleMap = async () => {
      try {
        // Fetch US map topology data
        const mapData = await d3.json('https://unpkg.com/us-atlas@3/counties-10m.json');
        const texasGeo = topojson.feature(mapData, mapData.objects.states).features.find(
          (state) => state.id === '48' // Texas FIPS code
        );

        // Fetch nursing homes data
        const response = await axios.get('https://api.senioruplift.me/api/nursinghomes/');
        const nursingHomes = response.data;

        // Match nursing homes to cities
        const cityCounts = TEXAS_CITIES.reduce((acc, city) => {
          acc[city] = 0;
          return acc;
        }, {});

        nursingHomes.forEach((home) => {
          const lowerAddress = (home.address || '').toLowerCase();
          TEXAS_CITIES.forEach((city) => {
            if (lowerAddress.includes(city)) {
              cityCounts[city]++;
            }
          });
        });

        // Convert cityCounts to an array for visualization
        const data = Object.keys(cityCounts).map((city) => ({
          city,
          count: cityCounts[city],
          coordinates: CITY_COORDINATES[city],
        }));

        // Prepare the map projection focused on Texas
        const projection = d3.geoAlbersUsa()
          .fitSize([900, 650], texasGeo); // Adjusted size and focus on Texas

        const path = d3.geoPath(projection);

        // Radius scale for the bubbles
        const radius = d3.scaleSqrt()
          .domain([0, d3.max(data, (d) => d.count)])
          .range([2, 15]); // Adjusted bubble size range

        // Clear existing content
        d3.select(svgRef.current).selectAll('*').remove();

        // Create the SVG container
        const svg = d3.select(svgRef.current)
          .attr('width', 900)
          .attr('height', 660); // Adjusted height to avoid cutoff

        // Add Texas boundary
        svg.append('path')
          .datum(texasGeo)
          .attr('fill', '#ddd')
          .attr('stroke', '#aaa')
          .attr('stroke-width', 1)
          .attr('d', path);

        // Add bubbles for each city
        svg.append('g')
          .attr('fill', 'brown')
          .attr('fill-opacity', 0.5)
          .attr('stroke', '#fff')
          .attr('stroke-width', 0.5)
          .selectAll('circle')
          .data(data.filter((d) => d.count > 0)) // Filter cities with count > 0
          .join('circle')
          .attr('transform', (d) => {
            const [x, y] = projection(d.coordinates);
            return `translate(${x},${y})`;
          })
          .attr('r', (d) => radius(d.count))
          .append('title')
          .text((d) => `${d.city.replace('-', ' ')}: ${d.count} Nursing Homes`);

        // Add legend
        const legend = svg.append('g')
          .attr('fill', '#777')
          .attr('transform', 'translate(850, 600)') // Adjusted position to avoid cutoff
          .attr('text-anchor', 'middle')
          .style('font', '10px sans-serif')
          .selectAll('g')
          .data(radius.ticks(4).slice(1))
          .join('g');

        legend.append('circle')
          .attr('fill', 'none')
          .attr('stroke', '#ccc')
          .attr('cy', (d) => -radius(d))
          .attr('r', radius);

        legend.append('text')
          .attr('y', (d) => -2 * radius(d))
          .attr('dy', '1.3em')
          .text(radius.tickFormat(4, 's'));
      } catch (error) {
        console.error('Error drawing the bubble map:', error);
      }
    };

    drawBubbleMap();
  }, []);

  return <svg ref={svgRef}></svg>;
};

export default BubbleMap;
