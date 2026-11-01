const populateFilters = data => {
    // 1. Add/Select buttons in the UI
    d3.select("#filters_screen")
        .selectAll(".filter")
        .data(filters_screen)
        .join("button")
        .attr("class", d => `filter ${d.isActive ? "active" : ""}`)
        .text(d => d.label)
        .on("click", (e, d) => {
            console.log("Clicked filter data:", d);

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