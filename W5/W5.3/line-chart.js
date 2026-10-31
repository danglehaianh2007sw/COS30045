const lineMargin = { top: 40, right: 40, bottom: 60, left: 70 };
const lineWidth = 800;
const lineHeight = 500;

const lineInnerWidth = lineWidth - lineMargin.left - lineMargin.right;
const lineInnerHeight = lineHeight - lineMargin.top - lineMargin.bottom;

const lineSvg = d3.select("#line-chart")
    .append("svg")
      .attr("viewBox", `0, 0, ${lineWidth}, ${lineHeight}`)
      .style("border", "1px solid black");

const lineInnerChart = lineSvg.append("g")
    .attr("transform", `translate(${lineMargin.left}, ${lineMargin.top})`);

d3.csv("ARE_Spot_Prices.csv", d => {
    return {
        year: +d.Year,
        averagePrice: +d["Average Price (notTas-Snowy)"]
    };
}).then(data => {
    drawLineChart(data);
});

const drawLineChart = data => {
    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.year))
        .range([0, lineInnerWidth]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.averagePrice) * 1.1])
        .range([lineInnerHeight, 0]);

    const bottomAxis = d3.axisBottom(xScale)
        .tickFormat(d3.format("d"));

    lineInnerChart.append("g")
        .attr("transform", `translate(0, ${lineInnerHeight})`)
        .call(bottomAxis)
        .selectAll("text")
        .style("font-size", "12px");

    const leftAxis = d3.axisLeft(yScale);
    lineInnerChart.append("g")
        .call(leftAxis);

    lineInnerChart.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -50)
        .attr("x", -lineInnerHeight / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .style("font-weight", "bold")
        .text("Average Price ($ per MWh)");

    lineInnerChart.selectAll("circle")
        .data(data)
        .join("circle")
        .attr("cx", d => xScale(d.year))
        .attr("cy", d => yScale(d.averagePrice))
        .attr("r", 4)
        .attr("fill", "green");

    const lineGenerator = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.averagePrice));

    lineInnerChart.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "green")
        .attr("stroke-width", 2)
        .attr("d", lineGenerator);
};