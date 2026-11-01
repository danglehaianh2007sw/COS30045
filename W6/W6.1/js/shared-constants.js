// Set up dimensions and margins[cite: 43]
const margin = { top: 40, right: 30, bottom: 50, left: 70 };
const width = 800;  // Total width of the chart[cite: 43]
const height = 400; // Total height of the chart[cite: 43]
const innerWidth = width - margin.left - margin.right;     //[cite: 43]
const innerHeight = height - margin.top - margin.bottom;   //[cite: 43]

// Set up colors accessible globally[cite: 44]
const barColor = "#606464";
const bodyBackgroundColor = "#fffaf0";

// Set up scales[cite: 45]
const xScale = d3.scaleLinear()
    .range([0, innerWidth]);

const yScale = d3.scaleLinear()
    .range([innerHeight, 0]);

// Set up the bin generator (reusable for interactions in Exercise 6.2)
const binGenerator = d3.bin()
    .value(d => d.energyConsumption)
    .domain([0, 2800]) // Maximum energy threshold
    .thresholds(14);   // 14 bins as shown in instructions