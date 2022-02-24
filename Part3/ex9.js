//Append 3 divs to the body, one with an ease Bounce, one with ease Elastic and the other ease Linear 


d3.select('body')
 .append("div")
 .style('width', '100px')
 .style('height', '100px')
 .style('background-color', 'blue')
 .style('transform', 'scale(1.0)')
 .transition()
 .ease( d3.easeBounce )
 .duration(5000)
 .style("background-color", "red")
 .style('transform', 'scale(0.5)')
 .text("Bounce");

 d3.select('body')
 .append("div")
 .style('width', '100px')
 .style('height', '100px')
 .style('background-color', 'blue')
 .style('transform', 'scale(1.0)')
 .transition()
 .ease( d3.easeElastic )
 .duration(5000)
 .style("background-color", "red")
 .style('transform', 'scale(0.5)')
 .text("Elastic");

 d3.select('body')
 .append("div")
 .style('width', '100px')
 .style('height', '100px')
 .style('background-color', 'blue')
 .style('transform', 'scale(1.0)')
 .transition()
 .ease( d3.easeLinear )
 .duration(5000)
 .style("background-color", "red")
 .style('transform', 'scale(0.5)')
 .text("Linear")
 .style("text-align","center");