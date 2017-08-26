
var defaultOpacity = 0.7

var projectViz = d3.select("#projects-viz").append("svg")
  .attr("width", width + chartMargin.left + chartMargin.right)
  .attr("height", chartHeight + chartMargin.top + chartMargin.bottom)
  .append("g")
  .attr("transform", "translate(" + chartMargin.left + "," + chartMargin.top + ")");

var skillDetail = d3.select("#project-text").append("svg")
  .attr("width", width + chartMargin.left + chartMargin.right)
  .attr("height", textHeight + textMargin.top + textMargin.bottom)
  .append("g")
  .attr("transform", "translate(" + textMargin.left + "," + textMargin.top + ")");


d3.csv("projects.csv", function(error, data) {
    if (error) throw error;

    console.log(data);

	var colorScale = d3.scaleOrdinal(d3.schemeCategory10)
		.domain([0, data.length - 1])

    var radius = 100
    buffer = 20
    circlesPerLine = Math.floor(width / (radius * 2 + buffer))

    var projectCircles = projectViz.selectAll('.projectCircle')
    	.data(data)
    	.enter().append('circle')
    	.attr('class', 'projectCircle')
    	.attr('r', radius)
    	.attr('cx', function(d, i) {
    		var circleLocation = radius + i*(radius*2 + buffer)
    		if (circleLocation < width) {
    			return radius + i*(radius*2 + buffer)
    		} else {
    			return radius*2 + (i-circlesPerLine)*(radius*2 + buffer)
    		}
    	 })
    	.attr('cy', function(d, i) {
    		var circleLocation = radius + i*(radius*2 + buffer)
    		if (circleLocation < width) {
    			return radius + buffer
			} else {
				return radius * 3 + buffer
			}
    	})
    	.style('fill', function(d, i) { return colorScale(i); })
    	.style('opacity', defaultOpacity)
    	.on('click', function(d) {

    		d3.select('#project-text')
	            .attr('class', 'project-text')
	            .text(d.description)

	        d3.selectAll('circle')
	        	.style('opacity', defaultOpacity)
	        	.attr('r', radius)

	       	d3.select(this)
	       		.attr('r', radius + buffer/2)
	       		.style('opacity', 1)
    	})
});









