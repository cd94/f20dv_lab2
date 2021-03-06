var svg = d3.select("svg");
var margin = 200;
var width = svg.attr("width") - margin;
var height = svg.attr("height") - margin;

let csvfile = "https://raw.githubusercontent.com/cd94/f20dv_lab2/master/Part4/csvfile.csv";

svg.append("text")
 .attr("transform", "translate(100,0)")
 .attr("x", 50)
 .attr("y", 50)
 .attr("font-size", "24px")
 .text("Stock Price")
 .attr("font-family","monospace")
 .attr("fill","DarkSlateGrey");

// Create scale variables for the axes
var x = d3.scaleBand().range([0, width]).padding(0.4);
var y = d3.scaleLinear().range([height, 0]);
var g = svg.append("g")
 .attr("transform", "translate(" + 100 + "," + 100 + ")");

// Read data in from CSV file
d3.csv(csvfile, function(i){
    return i;
}).then(function(data) { 

 x.domain( data.map(function(d) { return d.year; }) );
 y.domain([0, d3.max(data, function(d) { return d.value; })]);


// Create a color range scaled by the min and max value of the data 
 var colorRange = d3.scaleLinear().domain([d3.min(data, function(d) { return d.value; }),d3.max(data, function(d) { return d.value; })]).range(["blue", "red"]);

 // Append bottom axis and label
 g.append("g")
 .attr("transform", "translate(0," + height + ")")
 .call(d3.axisBottom(x))
 .append("text")
 .attr("y", height - 250)
 .attr("x", width - 100)    
 .attr("text-anchor", "end")
 .attr("stroke", "black")
 .text("Year");

// Append left axis and label
 g.append("g")
 .call(d3.axisLeft(y).tickFormat(function(d){
 return "$" + d;
 }).ticks(10))
 .append("text")
 .attr("transform", "rotate(-90)")
 .attr("y", 6)
 .attr("dy", "-5.1em")
 .attr("text-anchor", "end")
 .attr("stroke", "black")
 .text("Stock Price");

// Appends bar an denotes mouseover behavior
 g.selectAll(".bar")
 .data(data)
 .enter().append("rect")
 .attr("class", "bar")
 .on("mouseover", function(event, d, i){

    d3.select(this)
    .transition() // adds animation
    .duration(400)
    .attr('width', x.bandwidth() + 5)
    .attr("y", function(d) { return y(d.value) - 10; })
    .attr("height", function(d) { return height - y(d.value) + 10; })
    .style("fill", i => colorRange(d.value)); //Changes the color based on the value of the bar

    g.append("text")
    .attr('class', 'val') 
    .attr('x', function() {
       console.log(d.year);
    return x(d.year) + (x.bandwidth()/4);
    })
    .attr('y', function() {
    return y(d.value) - 15;
    })
    .attr("fill", i => colorRange(d.value))
    .attr("font-family","monospace")
    .attr("font-weight","bold")
    .text( function() { return '$' + d.value; } ); // Value of the text
   
 })
 .on("mouseout", function(event, d,i){
   
    d3.select(this)
    .transition() // adds animation
    .duration(400)
    .attr('width', x.bandwidth())
    .attr("y", function() { return y(d.value); })
    .attr("height", function() { return height - y(d.value); })
    .style("fill","SteelBlue"); // Re-sets the color back to original

    d3.selectAll('.val')
    .remove()
 })
 .attr("x", function(d) { return x(d.year); })
 .attr("y", function(d) { return y(d.value); })
 .attr("width", x.bandwidth()) 
 .transition()
 .ease(d3.easeLinear)
 .duration(400)
 .delay(function (d, i) {
 return i * 50;
 })
 .attr("height", function(d) { return height - y(d.value); });


});