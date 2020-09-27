// Set SVG width, SVG height, margin, width and height
var svgWidth = 960;
var svgHeight = 800;

var margin = {
  top: 20,
  right: 30,
  bottom: 100,
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
      data.poverty = +data.poverty;
      data.healthcare = +data.healthcare;
    });

    // Create scale functions
    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(healthData, d=> d.poverty)-1, d3.max(healthData, d=> d.poverty)+1])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([d3.min(healthData, d => d.healthcare)-3, d3.max(healthData, d => d.healthcare)+3])
      .range([height, 0]);

    // Create axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Append Axes to the chart
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    // Create circles
    var circlesGroup = chartGroup.selectAll("circle")
    .data(healthData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))

    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "15")
    .attr("class", "stateCircle")

    // Create text
    var chartText = textGrp.selectAll("text")
    .data(healthData)
    .enter()
    .append("text")
    .attr("dx", d => xLinearScale(d.poverty))
    .attr("dy", d => yLinearScale(d.healthcare))
    .text(function(d){return d.abbr})
    .attr("class", "stateText")

    // Initialize tool tip
    var toolTip = d3.tip()
      .attr("class", "d3-tip")
      .offset([100, -100])
      .html(function(d) {
        return (`<h6>${d.state}</h6><hr>In Poverty (%): ${d.poverty}<br>Healthcare Percentage: ${d.healthcare}`);
      });

    // Create tooltip in the chart
    chartGroup.call(toolTip);

    // Create event linisters to display and hide the tooltip
    chartText.on("mouseover", function(data) {
        toolTip.show(data, this);
    })
    circlesGroup.on("mouseover", function(data) {
        toolTip.show(data, this);
    })
      .on("mouseout", function(data, index) {
          toolTip.hide(data);
      });
    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("healthcare (%)");

      chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("In Poverty (%)");
  }).catch(function(error) {
    console.log(error);
});