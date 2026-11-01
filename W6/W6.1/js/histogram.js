const drawHistogram = data => {
    // 1. Set up SVG container and inner chart
    const svg = d3.select("#histogram")
        .append("svg")
          .attr("viewBox", `0, 0, ${width}, ${height}`)
          .style("background-color", bodyBackgroundColor);

    const innerChart = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // 2. Generate bins using the shared bin generator
    const bins = binGenerator(data);
    console.log("Generated Bins:", bins);

    // 3. Define the Scales domains
    // Lower bound from min of first bin (x0), upper bound from max of last bin (x1)
    xScale.domain([bins[0].x0, bins[bins.length - 1].x1]);

    // Upper domain for Y scale based on max bin length (frequency)
    const binsMaxLength = d3.max(bins, d => d.length);
    yScale.domain([0, binsMaxLength * 1.05]); // Add 5% headroom

    // 4. Draw the bars of the histogram
    innerChart.selectAll(".bin")
        .data(bins)
        .join("rect")
        .attr("class", "bar")
        .attr("x", d => xScale(d.x0))
        .attr("y", d => yScale(d.length))
        .attr("width", d => Math.max(0, xScale(d.x1) - xScale(d.x0) - 1)) // 1px gap for separation
        .attr("height", d => innerHeight - yScale(d.length))
        .attr("fill", barColor);

    // 5. Add X Axis
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

    // 6. Add Y Axis
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