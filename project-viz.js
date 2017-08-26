
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

    var projectCircleGroup = projectViz.selectAll('.projectCircleGroup')
    	.data(data)
    	.enter().append('g')
    	.attr('class', 'projectCircleGroup')
    	.attr('transform', function(d,i) { 
    		var circleLocation = radius + i*(radius*2 + buffer)
    		if (circleLocation < width) {
    			var xVal =  radius + i*(radius*2 + buffer)
    			var yVal =  radius + buffer
    		} else {
    			var xVal = radius*2 + (i-circlesPerLine)*(radius*2 + buffer)
    			var yVal = radius * 3 + buffer
    		}
    		return 'translate('+ xVal +',' + yVal +')'
    	})
    	.on('click', function(d) {

    		d3.select('#project-text')
	            .attr('class', 'project-text')
	            .text(d.description)

	        d3.selectAll('circle')
	        	.style('opacity', defaultOpacity)
	        	.attr('r', radius)

	       	d3.select(this)
	       		.select('circle')
	       		.transition()
	       		.attr('r', radius + buffer/2)
	       		.style('opacity', 1)

	       	d3.selectAll('text')
	       		.style('font-weight', 'normal')

	       	d3.select(this)
	       		.select('text')
	       		.style('font-weight', 'bold')
    	});

   projectCircleGroup.append('circle')
   	.attr('r', radius)
   	.style('fill', function(d, i) { return colorScale(i); })
   	.style('opacity', defaultOpacity)

  projectCircleGroup.append('text')
  	.text(function(d) {
  		return d.project
  	})
  	.style('text-anchor', 'middle')
});









