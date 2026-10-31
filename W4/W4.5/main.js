// Select the responsive container and append an SVG canvas
const svg = d3.select(".responsive-svg-container")
    .append("svg")
      .attr("viewBox", "0 0 1200 1600")
      .style("border", "1px solid black");

// Load the CSV data and typecast columns correctly
d3.csv("BrandCount.csv", d => {
    return {
        brand: d.Brand_Reg,
        count: +d.Available_TV_Count
    };
}).then(data => {
    // Sort data in descending order so highest counts appear first
    data.sort((a, b) => b.count - a.count);

    // CALL drawBarChart HERE INSIDE THE .then() BLOCK
    drawBarChart(data);
});

// Function to build and draw the bar chart
const drawBarChart = data => {
    const barHeight = 20;
    const spacing = 5;

    svg.selectAll("rect")
        .data(data)
        .join("rect")
        .attr("class", d => `bar bar-${d.count}`)
        .attr("width", d => d.count)
        .attr("height", barHeight)
        .attr("fill", "blue")
        .attr("x", 0)
        .attr("y", (d, i) => i * (barHeight + spacing));
};