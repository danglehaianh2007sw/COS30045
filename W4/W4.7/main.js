// Select the responsive container and append an SVG canvas
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

// Function to build and draw the bar chart with labels
const drawBarChart = data => {
    // 1. Create Linear Scale for X-axis (counts to pixel widths, leaving room for labels on the left)
    const xScale = d3.scaleLinear()
        .domain([0, 1200])   // Max data count (with headroom)
        .range([0, 320]);    // Max pixel width for bars (leaving ~120px for brand labels)

    // 2. Create Band Scale for Y-axis (brands to vertical spacing & height)
    const yScale = d3.scaleBand()
        .domain(data.map(d => d.brand))
        .range([0, 750])     // Total height allocated for bars
        .padding(0.2);       // Adds gap padding between the bands/bars

    // 3. Create group containers (barAndLabel) for each row of data
    const barAndLabel = svg
        .selectAll("g")
        .data(data)
        .join("g")
        .attr("transform", d => `translate(120, ${yScale(d.brand)})`); // Shift right for labels, down by yScale

    // 4. Append rectangles into each group
    barAndLabel.append("rect")
        .attr("class", d => `bar bar-${d.count}`)
        .attr("width", d => xScale(d.count))    // Scaled bar width
        .attr("height", yScale.bandwidth())     // Band scale thickness
        .attr("fill", "blue")
        .attr("x", 0)
        .attr("y", 0);                          // y is handled by the group's transform translate

    // 5. Append brand category text labels on the left
    barAndLabel.append("text")
        .text(d => d.brand)
        .attr("x", -10)                         // Positioned to the left of the bars
        .attr("y", yScale.bandwidth() / 2 + 4)  // Vertically centered relative to the bar
        .attr("text-anchor", "end")             // Right-aligns text for a clean look
        .style("font-size", "13px");

    // 6. Append exact count value numbers at the end of each bar
    barAndLabel.append("text")
        .text(d => d.count)
        .attr("x", d => xScale(d.count) + 8)    // Positioned slightly to the right of each bar
        .attr("y", yScale.bandwidth() / 2 + 4)  // Vertically centered relative to the bar
        .style("font-size", "13px");
};