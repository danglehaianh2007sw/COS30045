// Set up dimensions and margins
const margin = { top: 40, right: 30, bottom: 50, left: 70 };
const width = 800;
const height = 400;
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

// Set up inner chart variable for scatterplot[cite: 52]
let innerChartS;

// Set up tooltip dimensions[cite: 52]
const tooltipWidth = 65;
const tooltipHeight = 32;

// Set up colors accessible globally
const barColor = "#606464";
const bodyBackgroundColor = "#fffaf0";

// Set up the histogram scales
const xScale = d3.scaleLinear()
    .range([0, innerWidth]);

const yScale = d3.scaleLinear()
    .range([innerHeight, 0]);

// Set up the scatterplot scales and color scale[cite: 52]
const xScaleS = d3.scaleLinear()
    .range([0, innerWidth]);

const yScaleS = d3.scaleLinear()
    .range([innerHeight, 0]);

const colorScale = d3.scaleOrdinal()
    .domain(["LED", "LCD", "OLED"])
    .range(d3.schemeCategory10); // Or d3.schemeTableau10

// Create a bin generator using d3.bin
const binGenerator = d3.bin()
    .value(d => d.energyConsumption)
    .domain([0, 2800])
    .thresholds(14);

// Array of filter options for screen types
const filters_screen = [
    { id: "all", label: "All", isActive: true },
    { id: "LED", label: "LED", isActive: false },
    { id: "LCD", label: "LCD", isActive: false },
    { id: "OLED", label: "OLED", isActive: false }
];