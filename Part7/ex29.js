var width = 400, height = 400;
// setup svg
d3.select('body').append('svg').attr('width',width).attr('height',height);

// smallest and largest radi of nodes
let min = 13;
let max = 25;

// Manually create nodes
var nodes = [{radius: min, index: 0, x: 171.9, y: 198.7, vy: -0.003},
    {radius: 19.9, index: 1, x: 267.9, y: 154.4, vy: -0.003},
    {radius: max, index: 2, x: 294.4, y: 132.67, vy: -0.001},
    {radius: 23.2, index: 3, x: 263.4, y: 234.09, vy: 0.004},
    {radius: 15.4, index: 4, x: 177.2, y: 203.5, vy: -0.0008},
    {radius: 21.6, index: 5, x: 217.6, y: 219.8, vy: -0.001}]

// Color range 
var colorRange = d3.scaleLinear().domain([min,max]).range(["blue", "red"]);

var u = d3.select('svg')

// D3 Force simulation variable instantiated
var simulation = d3.forceSimulation(nodes)
 .force('charge', d3.forceManyBody().strength(5))
 .force('center', d3.forceCenter(width / 2, height / 2))
 .force('collision', d3.forceCollide().radius(function(d) {
 return d.radius
 }))
 .on('tick', ticked);

// Defining tick function
function ticked() {

// Set nodes color, radius and coordinates
 u.selectAll('circle')
 .data(nodes)
 .join('circle')
 .attr('fill', function(d){
     return colorRange(d.radius);
 })
 .attr('r', function(d) {
 return d.radius
 })
 .attr('cx', function(d) {
 return d.x
 })
 .attr('cy', function(d) {
 return d.y
 })
}

console.log('ready..');