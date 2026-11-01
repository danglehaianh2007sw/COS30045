const populateFilters = data => {
    // 1. Add/Select buttons in the UI
    d3.select("#filters_screen")
        .selectAll(".filter")
        .data(filters_screen)
        .join("button")
        .attr("class", d => `filter ${d.isActive ? "active" : ""}`)
        .text(d => d.label)
        .on("click", (e, d) => {
            // If the clicked filter is not already active
            if (!d.isActive) {
                // Update active state across all filters
                filters_screen.forEach(filter => {
                    filter.isActive = (filter.id === d.id);
                });

                // Update button CSS classes
                d3.selectAll("#filters_screen .filter")
                    .classed("active", filter => filter.id === d.id);

                // Update the histogram based on selected filter
                updateHistogram(data, d.id);
            }
        });
};

// --- Exercise 6.4: Create Tooltip ---
const createTooltip = data => {
    const tooltip = innerChartS
        .append("g")
        .attr("class", "tooltip")
        .style("opacity", 0);

    // Append tooltip background rectangle
    tooltip.append("rect")
        .attr("width", tooltipWidth)
        .attr("height", tooltipHeight)
        .attr("rx", 3)
        .attr("ry", 3)
        .attr("fill", barColor)
        .attr("fill-opacity", 0.75);

    // Append tooltip text
    tooltip.append("text")
        .text("NA")
        .attr("x", tooltipWidth / 2)
        .attr("y", tooltipHeight / 2 + 2)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("fill", "white")
        .style("font-weight", 900);
};

// --- Exercise 6.4: Handle Mouse Events for Scatterplot ---
const handleMouseEvents = () => {
    innerChartS.selectAll("circle")
        .on("mouseenter", (e, d) => {
            console.log("Mouse entered circle", d);

            // 1. Update text in tooltip with screen size
            d3.select(".tooltip text")
                .text(d.screenSize);

            // 2. Get cx and cy attributes of the hovered circle
            const cx = e.target.getAttribute("cx");
            const cy = e.target.getAttribute("cy");

            // 3. Position and show tooltip with transition
            d3.select(".tooltip")
                .attr("transform", `translate(${cx - 0.5 * tooltipWidth}, ${cy - 1.5 * tooltipHeight})`)
                .transition()
                .duration(200)
                .style("opacity", 1);
        })
        .on("mouseleave", (e, d) => {
            console.log("Mouse left circle", d);

            // 4. Hide tooltip and move it out of the way
            d3.select(".tooltip")
                .style("opacity", 0)
                .attr("transform", `translate(0, 500)`);
        });
};