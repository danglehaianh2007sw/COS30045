const donutWidth = 800;
const donutHeight = 500;
const radius = Math.min(donutWidth, donutHeight) / 2 - 20;

const donutSvg = d3.select("#donut-chart")
    .append("svg")
      .attr("viewBox", `0, 0, ${donutWidth}, ${donutHeight}`)
      .style("border", "1px solid black");

const donutInnerChart = donutSvg.append("g")
    .attr("transform", `translate(${donutWidth / 2}, ${donutHeight / 2})`);

d3.csv("Screensize_Category.csv", d => {
    return {
        category: d.Screensize_Category,
        count: +d["Count(Model_No)"]
    };
}).then(data => {
    drawDonutChart(data);
});

const drawDonutChart = data => {
    const color = d3.scaleOrdinal()
        .domain(data.map(d => d.category))
        .range(d3.schemeSet2);

    const pie = d3.pie()
        .value(d => d.count)
        .sort(null);

    const arcGenerator = d3.arc()
        .innerRadius(radius * 0.6)
        .outerRadius(radius * 1.0)
        .padAngle(0.02)
        .cornerRadius(6);

    donutInnerChart.selectAll("path")
        .data(pie(data))
        .join("path")
        .attr("d", arcGenerator)
        .attr("fill", d => color(d.data.category))
        .attr("stroke", "white")
        .attr("stroke-width", 2);

    donutInnerChart.selectAll("text")
        .data(pie(data))
        .join("text")
        .attr("transform", d => `translate(${arcGenerator.centroid(d)})`)
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .style("fill", "white")
        .style("font-weight", "bold")
        .text(d => d.data.category);
};