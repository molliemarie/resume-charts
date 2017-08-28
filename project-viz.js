
var defaultOpacity = 0.7

function resize() {

	d3.selectAll(".skill-detail").remove();


	var div_width = d3.select("#projects-viz-box").node().getBoundingClientRect()['width'];
	console.log(div_width)
	var width = div_width - chartMargin.left - chartMargin.right

	var projectViz = d3.select("#projects-viz").append("svg")
	  .attr("width", width + chartMargin.left + chartMargin.right)
	  .attr("height", projectHeight + chartMargin.top + chartMargin.bottom)

	var skillDetail = d3.select("#project-text").append("div")
	  .attr('class', 'skill-detail')
	  .attr("width", width + chartMargin.left + chartMargin.right)
	  .attr("height", textHeight + textMargin.top + textMargin.bottom)

	d3.csv("projects.csv", ready)

	function ready(error, data) {
	    if (error) throw error;

		var colorScale = d3.scaleOrdinal(d3.schemeCategory10)
			.domain([0, data.length - 1]);

	    var projectCount = data.length;
	    var circleSpace = (width - 20) / projectCount;
	    var radius = (circleSpace * .9)/2;
	    var buffer = circleSpace - radius*2;

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

	    		links = d.links.split(';')
	    		console.log(String(d.description))

		        skillDetail.append('text').text('hi hi hi')


		       	skillDetail.html(d.description)

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
	  	.style('font-size', div_width * 0.0157325467)

	 skillDetail.append('text').text('Click on project to see project details')
	}
}



// Draw for the first time to initialize.
resize();

// Redraw based on the new size whenever the browser window is resized.3
window.addEventListener("resize", resize);




