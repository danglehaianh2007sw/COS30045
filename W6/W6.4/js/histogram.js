// Keep track of innerChart reference globally for updates
let innerChart;

const drawHistogram = data => {
    // 1. Set up SVG container and inner chart
    const svg = d3.select("#histogram")
        .append("svg")
          .attr("viewBox", `0, 0, ${width}, ${height}`)
          .style("background-color", bodyBackgroundColor);

    innerChart = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Initial render with all data
    updateHistogram(data, "all");

    // Add X Axis
    const xAxis = d3.axisBottom(xScale);
    innerChart.append("g")
        .attr("class", "axis x-axis")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(xAxis);

    // X Axis Label
    innerChart.append("text")
        .attr("x", innerWidth)
        .attr("y", innerHeight + 40)
        .attr("text-anchor", "end")
        .style("font-size", "12px")
        .text("Labeled Energy Consumption (kWh/year)");

    // Add Y Axis
    const yAxis = d3.axisLeft(yScale);
    innerChart.append("g")
        .attr("class", "axis y-axis")
        .call(yAxis);

    // Y Axis Label
    innerChart.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -50)
        .attr("x", 0)
        .attr("text-anchor", "end")
        .style("font-size", "12px")
        .text("Frequency");
};

// Function to update the histogram when a filter is selected
const updateHistogram = (data, filterId) => {
    // 1. Filter data based on selected category (if not "all")
    let updatedData = data;
    if (filterId !== "all") {
        updatedData = data.filter(d => d.screenTech === filterId);
    }

    // 2. Generate bins using the shared binGenerator
    const bins = binGenerator(updatedData);

    // 3. Update scales domains
    xScale.domain([bins[0].x0, bins[bins.length - 1].x1]);
    const binsMaxLength = d3.max(bins, d => d.length);
    yScale.domain([0, binsMaxLength * 1.05]);

    // Update Y Axis dynamically with transition
    innerChart.select(".y-axis")
        .transition().duration(800)
        .call(d3.axisLeft(yScale));

    // 4. Bind bins to rectangles and update with transitions
    innerChart.selectAll(".bar")
        .data(bins)
        .join(
            enter => enter.append("rect")
                .attr("class", "bar")
                .attr("x", d => xScale(d.x0))
                .attr("y", innerHeight)
                .attr("width", d => Math.max(0, xScale(d.x1) - xScale(d.x0) - 1)) // Fixed from .width() to .attr("width", ...)
                .attr("height", 0)
                .attr("fill", barColor)
                .call(enter => enter.transition().duration(800)
                    .attr("y", d => yScale(d.length))
                    .attr("height", d => innerHeight - yScale(d.length))),
            update => update
                .call(update => update.transition().duration(800)
                    .attr("x", d => xScale(d.x0))
                    .attr("width", d => Math.max(0, xScale(d.x1) - xScale(d.x0) - 1))
                    .attr("y", d => yScale(d.length))
                    .attr("height", d => innerHeight - yScale(d.length))),
            exit => exit
                .call(exit => exit.transition().duration(400)
                    .attr("height", 0)
                    .attr("y", innerHeight)
                    .remove())
        );
};