// 1. Define dimensions and margins using the D3 Margin Convention
const margin = { top: 40, right: 40, bottom: 60, left: 70 };
const width = 800;
const height = 500;

const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

// 2. Select the #bar-chart div and append the SVG container
const svg = d3.select("#bar-chart")
    .append("svg")
      .attr("viewBox", `0, 0, ${width}, ${height}`)
      .style("border", "1px solid black");

// 3. Append the inner chart group and shift it by top and left margins
const innerChart = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// 4. Load the ScreenTech CSV data
d3.csv("ScreenTech.csv", d => {
    return {
        screenTech: d.Screen_Tech,
        energy: +d["Mean(Labelled energy consumption (kWh/year))"]
    };
}).then(data => {
    data.sort((a, b) => b.energy - a.energy);
    drawBarChart(data);
});

// 5. Function to build and draw the vertical bar chart
const drawBarChart = data => {
    const xScale = d3.scaleBand()
        .domain(data.map(d => d.screenTech))
        .range([0, innerWidth])
        .padding(0.3);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.energy) * 1.1])
        .range([innerHeight, 0]);

    // X Axis
    const xAxis = d3.axisBottom(xScale);
    innerChart.append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(xAxis)
        .selectAll("text")
        .style("font-size", "12px");

    // Y Axis
    const yAxis = d3.axisLeft(yScale);
    innerChart.append("g")
        .call(yAxis);

    // Y Axis Label
    innerChart.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -50)
        .attr("x", -innerHeight / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .style("font-weight", "bold")
        .text("Energy Consumption (kWh/year)");

    // Draw Bars
    innerChart.selectAll(".bar")
        .data(data)
        .join("rect")
        .attr("class", "bar")
        .attr("x", d => xScale(d.screenTech))
        .attr("y", d => yScale(d.energy))
        .attr("width", xScale.bandwidth())
        .attr("height", d => innerHeight - yScale(d.energy))
        .attr("fill", "green");

    // Value Labels on Top of Bars
    innerChart.selectAll(".label")
        .data(data)
        .join("text")
        .attr("class", "label")
        .text(d => `${Math.round(d.energy)} kWh`)
        .attr("x", d => xScale(d.screenTech) + xScale.bandwidth() / 2)
        .attr("y", d => yScale(d.energy) - 8)
        .attr("text-anchor", "middle")
        .style("font-size", "12px");
};