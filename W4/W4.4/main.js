// Select the responsive container and append an SVG canvas
const svg = d3.select(".responsive-svg-container")
    .append("svg")
      .attr("viewBox", "0 0 1200 1600")
      .style("border", "1px solid black");

// Load the CSV data and typecast columns correctly using Brand_Reg and Available_TV_Count
d3.csv("../data/BrandCount.csv", d => {
    return {
        brand: d.Brand_Reg,
        count: +d.Available_TV_Count // The '+' sign converts the string into a number
    };
}).then(data => {
    // Sort data in descending order so the highest counts appear first
    data.sort((a, b) => b.count - a.count);

    // Console logs to verify dataset properties
    console.log("Full Dataset Array:", data);
    console.log("Total rows (length):", data.length);
    console.log("Max count:", d3.max(data, d => d.count));
    console.log("Min count:", d3.min(data, d => d.count));
    console.log("Extent [min, max]:", d3.extent(data, d => d.count));

    // Pass the loaded and formatted data to our drawing function
    drawBarChart(data);
});

// Placeholder function for the upcoming bar chart exercise
function drawBarChart(data) {
    console.log("drawBarChart function successfully received data:", data);
}