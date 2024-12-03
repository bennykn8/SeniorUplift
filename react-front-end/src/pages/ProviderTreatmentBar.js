import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import axios from "axios";

const TreatmentsBarChart = () => {
  const chartRef = useRef();
  const width = 928;
  const height = 500;
  const marginTop = 30;
  const marginRight = 30;
  const marginBottom = 100; // Increased for treatment type labels
  const marginLeft = 50;

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.mentalhealthtexas.me/get-treatments"
        );
        const apiData = response.data;

        // Aggregate data by treatment_type
        const groupedData = d3.rollups(
          apiData,
          (v) => v.length, // Count the number of treatments in each type
          (d) => d.treatment_type
        ).map(([treatment_type, frequency]) => ({
          treatment_type,
          frequency,
        }));

        setData(groupedData);
      } catch (error) {
        console.error("Error fetching data:", error);
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
    d3.select(chartRef.current).selectAll("svg").remove();

    // Create the scales
    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.treatment_type))
      .range([marginLeft, width - marginRight])
      .padding(0.2); // Add spacing between bars

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.frequency)])
      .nice() // Adjusts the domain to nice round values
      .range([height - marginBottom, marginTop]);

    const format = d3.format(",");

    // Create the SVG container
    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr(
        "style",
        "max-width: 100%; height: auto; font: 10px sans-serif;"
      );

    // Define a color gradient
    const gradient = svg
      .append("defs")
      .append("linearGradient")
      .attr("id", "gradient")
      .attr("x1", "0%")
      .attr("x2", "0%")
      .attr("y1", "100%")
      .attr("y2", "0%");
    gradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "lightblue");
    gradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "steelblue");

    // Append a rect for each treatment type
    svg
      .append("g")
      .attr("fill", "url(#gradient)") // Apply gradient fill
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", (d) => x(d.treatment_type))
      .attr("y", (d) => y(d.frequency))
      .attr("width", x.bandwidth())
      .attr("height", (d) => y(0) - y(d.frequency));

    // Append a label for each treatment type
    svg
      .append("g")
      .attr("fill", "black")
      .attr("text-anchor", "middle")
      .selectAll("text")
      .data(data)
      .join("text")
      .attr("x", (d) => x(d.treatment_type) + x.bandwidth() / 2)
      .attr("y", (d) => y(d.frequency) - 5)
      .text((d) => format(d.frequency));

    // Create the axes
    svg
      .append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x).tickSizeOuter(0))
      .selectAll("text")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-45)") // Rotate x-axis labels for readability
      .style("font-size", "10px");

    svg
      .append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y))
      .call((g) => g.select(".domain").remove());
  };

  return <div ref={chartRef}></div>;
};

export default TreatmentsBarChart;
