
var defaultOpacity = 0.7

function resize() {

	var chartMargin = {top: 0, right: 0, bottom: 20, left: 20}
	textMargin = {top: 20, right: 20, bottom: 20, left: 20};

	var window_width = window.innerWidth;
	var width = window_width - chartMargin.left - chartMargin.right,
	chartHeight = 500 - chartMargin.top - chartMargin.bottom,
	textHeight = 50 - textMargin.top - textMargin.bottom,
	projectHeight = 500 - chartMargin.top - chartMargin.bottom;

	var projectViz = d3.select("#projects-viz").append("svg")
	  .attr("width", width + chartMargin.left + chartMargin.right)
	  .attr("height", projectHeight + chartMargin.top + chartMargin.bottom)
	  // .append("g")
	  // .attr("transform", "translate(" + chartMargin.left + "," + chartMargin.top + ")");

	var skillDetail = d3.select("#project-text").append("svg")
	  .attr("width", width + chartMargin.left + chartMargin.right)
	  .attr("height", textHeight + textMargin.top + textMargin.bottom)
	  .append("g")
	  .attr("transform", "translate(" + textMargin.left + "," + textMargin.top + ")");

	d3.csv("projects.csv", ready)

	function ready(error, data) {
	    if (error) throw error;

	    console.log(data);
	    console.log(data.length);

		var colorScale = d3.scaleOrdinal(d3.schemeCategory10)
			.domain([0, data.length - 1]);

	    var projectCount = data.length;
	    var circleSpace = (width - 20) / projectCount;
	    var radius = (circleSpace * .9)/2;
	    var buffer = circleSpace - radius*2;
	    // circlesPerLine = Math.floor(width / (radius * 2 + buffer))

	    projectViz.attr('height', (radius * 2 + buffer * 2));

	    var projectCircleGroup = projectViz.selectAll('.projectCircleGroup')
	    	.data(data)
	    	.enter().append('g')
	    	.attr('class', 'projectCircleGroup')
	    	.attr('transform', function(d,i) { 
    			var xVal =  radius + buffer + i*(radius*2 + buffer)
    			var yVal =  radius + buffer
	    		return 'translate('+ xVal +',' + yVal +')'
	    	})
	    	.on('click', function(d) {

	    		d3.select('#project-text')
		            .attr('class', 'details-text')
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
		       		.transition()
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
	}
}




// Draw for the first time to initialize.
resize();

// Redraw based on the new size whenever the browser window is resized.3
window.addEventListener("resize", resize);




