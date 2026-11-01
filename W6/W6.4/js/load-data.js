// Load the CSV file with row conversion function
d3.csv("data/Ex6_TVdata_withStar.csv", d => ({
    brand: d.brand,
    model: d.model,
    screenSize: +d.screenSize,
    screenTech: d.screenTech,
    energyConsumption: +d.energyConsumption,
    star: +d.star
})).then(data => {
    console.log("Loaded TV Data successfully:", data);

    // Call chart and interaction functions after data is loaded
    drawHistogram(data);
    if (typeof populateFilters === "function") {
        populateFilters(data);
    }
    
    // --- ADD THESE LINES ---
    drawScatterplot(data);
    if (typeof createTooltip === "function") createTooltip();
    if (typeof handleMouseEvents === "function") handleMouseEvents();

}).catch(error => {
    console.error("Error loading the CSV file:", error);
});