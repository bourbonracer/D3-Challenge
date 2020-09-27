// Set SVG width, SVG height, margin, width and height
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group to hold our chart, and shift the chart by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);
var textGrp = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("assets/data/data.csv").then(function(healthData) {

    // Parse Data/Cast as numbers
    healthData.forEach(function(data) {
      data.age = +data.age;
      data.smokes = +data.smokes;
    });

    // Create scale functions
    var xLinearScale = d3.scaleLinear()
      .domain(d3.max(healthData, d=> d.age))
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain(d3.max(healthData, d => d.smokes))
      .range([height, 0]);

    // Create axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    
})