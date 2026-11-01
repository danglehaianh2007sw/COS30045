// 1. Define dimensions and margins (matching Exercise 5.1 so charts are the same size)
const lineMargin = { top: 40, right: 40, bottom: 60, left: 70 };
const lineWidth = 800;
const lineHeight = 500;

const lineInnerWidth = lineWidth - lineMargin.left - lineMargin.right;
const lineInnerHeight = lineHeight - lineMargin.top - lineMargin.bottom;

// 2. Select the #line-chart div and append the SVG container
const lineSvg = d3.select("#line-chart")
    .append("svg")
      .attr("viewBox", `0, 0, ${lineWidth}, ${lineHeight}`)
      .style("border", "1px solid black");

// 3. Append the inner chart group and shift it by margins
const lineInnerChart = lineSvg.append("g")
    .attr("transform", `translate(${lineMargin.left}, ${lineMargin.top})`);

// 4. Load the ARE Spot Prices CSV data
d3.csv("ARE_Spot_Prices.csv", d => {
    return {
        year: +d.Year, // Typecast year as a number
        averagePrice: +d["Average Price (notTas-Snowy)"] // Typecast average price as a number
    };
}).then(data => {
    console.log("Loaded Electricity Price Data:", data);

    // Call drawLineChart function with the processed data
    drawLineChart(data);
});

// 5. Function to build and draw the scatter plot and line chart
const drawLineChart = data => {

    // --- Scales ---
    // X Scale: Continuous linear scale using d3.extent for min and max years (1998 to 2024)
    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.year))
        .range([0, lineInnerWidth]);

    // Y Scale: Continuous linear scale from 0 to max average price with headroom
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.averagePrice) * 1.1])
        .range([lineInnerHeight, 0]);

    // --- Axes ---
    // Bottom Axis with integer tick formatting (no commas like "2,000")
    const bottomAxis = d3.axisBottom(xScale)
        .tickFormat(d3.format("d"));

    lineInnerChart.append("g")
        .attr("transform", `translate(0, ${lineInnerHeight})`)
        .call(bottomAxis)
        .selectAll("text")
        .style("font-size", "12px");

    // Left Axis
    const leftAxis = d3.axisLeft(yScale);
    lineInnerChart.append("g")
        .call(leftAxis);

    // --- Y Axis Label ---
    lineInnerChart.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -50)
        .attr("x", -lineInnerHeight / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .style("font-weight", "bold")
        .text("Average Price ($ per MWh)");

    // --- Draw Scatter Plot (Circles for data points) ---
    lineInnerChart.selectAll("circle")
        .data(data)
        .join("circle")
        .attr("cx", d => xScale(d.year))
        .attr("cy", d => yScale(d.averagePrice))
        .attr("r", 4)
        .attr("fill", "green");

    // --- Draw Line Generator ---
    const lineGenerator = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.averagePrice));

    // --- Append Path for the Line ---
    lineInnerChart.append("path")
        .datum(data) // Bind entire dataset to the path
        .attr("fill", "none")
        .attr("stroke", "green")
        .attr("stroke-width", 2)
        .attr("d", lineGenerator);
};