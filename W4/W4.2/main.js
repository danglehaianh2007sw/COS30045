// Step 2: Apply a style to an HTML element using D3
d3.select("h1")
  .style("color", "green");

// Step 3: Append a paragraph element with text inside the div container
d3.select(".container")
  .append("p")
    .text("Purchasing a low energy consumption TV will help with your energy bills!");

// Step 4: Append an SVG rectangle with attributes and styling so it is visible
d3.select("svg")
  .append("rect")
    .attr("x", 50)
    .attr("y", 50)
    .attr("width", 100)
    .attr("height", 30)
    .style("fill", "green");