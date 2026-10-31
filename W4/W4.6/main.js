// Select the responsive container and append an SVG canvas with a smaller viewBox width
const svg = d3.select(".responsive-svg-container")
    .append("svg")
      .attr("viewBox", "0 0 500 800")
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

    // Call drawBarChart inside the .then() block
    drawBarChart(data);
});

// Function to build and draw the bar chart using D3 scales
const drawBarChart = data => {
    // 1. Create Linear Scale for X-axis (counts to pixel widths)
    const xScale = d3.scaleLinear()
        .domain([0, 1200])   // Max data count (with a bit of extra headroom)
        .range([0, 400]);    // Max pixel width in SVG (leaving 100px for labels)

    // 2. Create Band Scale for Y-axis (brands to vertical spacing & height)
    const yScale = d3.scaleBand()
        .domain(data.map(d => d.brand))
        .range([0, 750])     // Total height allocated for bars
        .padding(0.2);       // Adds gap padding between the bands/bars

    svg.selectAll("rect")
        .data(data)
        .join("rect")
        .attr("class", d => `bar bar-${d.count}`)
        .attr("width", d => xScale(d.count))    // Use linear scale for width
        .attr("height", yScale.bandwidth())     // Use band scale for bar thickness
        .attr("fill", "blue")
        .attr("x", 0)
        .attr("y", d => yScale(d.brand));       // Use band scale for vertical position
};