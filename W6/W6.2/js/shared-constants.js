// Set up dimensions and margins
const margin = { top: 40, right: 30, bottom: 50, left: 70 };
const width = 800;
const height = 400;
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

// Set up colors accessible globally
const barColor = "#606464";
const bodyBackgroundColor = "#fffaf0";

// Set up scales
const xScale = d3.scaleLinear()
    .range([0, innerWidth]);

const yScale = d3.scaleLinear()
    .range([innerHeight, 0]);

// Set up the shared bin generator
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