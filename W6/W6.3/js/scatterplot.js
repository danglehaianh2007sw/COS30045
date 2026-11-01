const drawScatterplot = data => {
    // 1. Set up SVG container and inner chart for scatterplot
    const svg = d3.select("#scatterplot")
        .append("svg")
          .attr("viewBox", `0, 0, ${width}, ${height}`)
          .style("background-color", bodyBackgroundColor);

    innerChartS = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // 2. Set up Domains for Scales
    xScaleS.domain([0, d3.max(data, d => d.star)]);
    yScaleS.domain([0, d3.max(data, d => d.energyConsumption) * 1.05]);

    // 3. Draw Scatter Plot Circles
    innerChartS.selectAll("circle")
        .data(data)
        .join("circle")
        .attr("cx", d => xScaleS(d.star))
        .attr("cy", d => yScaleS(d.energyConsumption))
        .attr("r", 5)
        .attr("fill", d => colorScale(d.screenTech))
        .attr("opacity", 0.5);

    // 4. Add Bottom Axis (X-Axis)
    const xAxisS = d3.axisBottom(xScaleS);
    innerChartS.append("g")
        .attr("class", "axis x-axis")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(xAxisS);

    // X Axis Label
    innerChartS.append("text")
        .attr("x", innerWidth)
        .attr("y", innerHeight + 40)
        .attr("text-anchor", "end")
        .style("font-size", "12px")
        .text("Star Rating");

    // 5. Add Left Axis (Y-Axis)
    const yAxisS = d3.axisLeft(yScaleS);
    innerChartS.append("g")
        .attr("class", "axis y-axis")
        .call(yAxisS);

    // Y Axis Label
    innerChartS.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -55)
        .attr("x", 0)
        .attr("text-anchor", "end")
        .style("font-size", "12px")
        .text("Labeled Energy Consumption (kWh/year)");

    // 6. Add Legend in Top Right Corner
    const legend = svg.append("g")
        .attr("transform", `translate(${width - 100}, ${margin.top})`);

    colorScale.domain().forEach((screenTech, i) => {
        const legendRow = legend.append("g")
            .attr("transform", `translate(0, ${i * 20})`);

        legendRow.append("rect")
            .attr("width", 10)
            .attr("height", 10)
            .attr("fill", colorScale(screenTech));

        legendRow.append("text")
            .attr("x", 20)
            .attr("y", 10)
            .attr("text-anchor", "start")
            .style("font-size", "12px")
            .style("font-weight", "bold")
            .text(screenTech);
    });
};