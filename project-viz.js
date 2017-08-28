
var defaultOpacity = 0.7

function resize() {

	d3.selectAll(".skill-detail").remove();


	var window_width = window.innerWidth;
	var width = window_width - chartMargin.left - chartMargin.right
	window_height = window.innerHeight;

	var projectViz = d3.select("#projects-viz").append("svg")
	  .attr("width", width + chartMargin.left + chartMargin.right)
	  .attr("height", projectHeight + chartMargin.top + chartMargin.bottom)

	var skillDetail = d3.select("#project-text").append("div")
	  .attr('class', 'skill-detail')
	  .attr("width", width + chartMargin.left + chartMargin.right)
	  .attr("height", textHeight + textMargin.top + textMargin.bottom)
  	//   .append("g")
	  // .attr("transform", "translate(" + textMargin.left + "," + textMargin.top + ")");

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

		       	// d3.select('.skill-detail')
		       	// 	.append('div')
		       	// 	// .attr('class', 'test')
		       	// 	.html("<p>Code.org hired outlier to help them develop a series of surveys to evaluate how they’re doing in their goal to make STEM education more accessible in the classrooms. Outlier then hired Datascope to create a visualization to show off some of said survey responses. The <a href='http://outlier.uchicago.edu/evaluation_codeorg/visualizations/codeorg/'>resulting visualization</a> was created using free-form text-response data from three groups of students in response to the question “What is Computer Science?” This visualization was created for the general public with the hopes of highlighting the size of the study, the individuality of the students, and the uniqueness of the response. </p>")
		       		// .text(function(d) {
		       		// 	links = d.links.split(';')
		       		// })
		       		// .html("<a href='datascopeanalytics.com'>datascope</a>")
		       		// .html(function(d) {
		       		// 	links.foreach(function(d) {
		       		// 		console.log(d)
		       		// 		dSplit = d.split(', ')
		       		// 		console.log(dSplit)
		       		// 		return "<a href=" + dSplit[1] + ">" + dSplit[0] + "</a>"
		       		// 	})
		       		// })
		       		// .text(function(d) {
		       		// 	return
		       		// })
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

	 skillDetail.append('text').text('Click on project to see project details')
	}
}



// Draw for the first time to initialize.
resize();

// Redraw based on the new size whenever the browser window is resized.3
window.addEventListener("resize", resize);




