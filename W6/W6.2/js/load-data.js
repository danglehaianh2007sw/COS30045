// Load the CSV file with row conversion function[cite: 41]
d3.csv("data/Ex6_TVdata_withStar.csv", d => ({
    brand: d.brand,
    model: d.model,
    screenSize: +d.screenSize,         // Convert screenSize to number[cite: 41]
    screenTech: d.screenTech,
    energyConsumption: +d.energyConsumption, // Convert energyConsumption to number[cite: 41]
    star: +d.star                      // Convert star to number[cite: 41]
})).then(data => {
    console.log("Loaded TV Data successfully:", data);

    // Call chart and interaction functions after data is loaded[cite: 41]
    drawHistogram(data);
    if (typeof populateFilters === "function") {
        populateFilters(data);
    }
}).catch(error => {
    console.error("Error loading the CSV file:", error);
});