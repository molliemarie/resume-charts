

defaultBarColor = '#E7962A'

function resize() {

  d3.selectAll("svg").remove();

  var div_width = d3.select("#skillz-barchart-and-details").node().getBoundingClientRect()['width'];
  var width = div_width - chartMargin.left - chartMargin.right;
  var chartHeight = window_height * .5

  var skillChart = d3.select("#skillz-chart").append("svg")
    .attr("width", width + chartMargin.left + chartMargin.right)
    .attr("height", chartHeight + chartMargin.top + chartMargin.bottom)
    .append("g")
    .attr("transform", "translate(" + chartMargin.left + "," + chartMargin.top + ")");

  var skillDetail = d3.select("#details-text").append("svg")
    .attr("width", width + chartMargin.left + chartMargin.right)
    .attr("height", textHeight + textMargin.top + textMargin.bottom)
    .append("g")
    .attr("transform", "translate(" + textMargin.left + "," + textMargin.top + ")");

  var tooltip = d3.select("body").append("div").attr("class", "toolTip");
      
  var xScale = d3.scaleLinear()
    .range([0, width]);

  var yScale = d3.scaleBand()
    .range([chartHeight, 0])
    .padding(0.3);

  var xAxis = d3.axisBottom(xScale)
    .ticks(4)
    .tickSize(-chartHeight);

  var yAxis = d3.axisLeft(yScale)
    .tickSize(0)
    .tickPadding(-5);

  d3.csv("skill_rating.csv", ready)

  function ready(error, data) {

    if (error) throw error;

    console.log(data)

    data = data.reverse();

    xScale.domain([0, 10])
    yScale.domain(data.map(function(d) { return d.skill; })).padding(0.1);

    skillChart.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + chartHeight + ")")
        .call(xAxis);

    skillChart.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    skillChart.selectAll(".bar")
        .data(data)
      .enter().append("rect")
        .attr("class", function(d) { return "bar clickable " + d.skill.split(' ').join('-')})
        .attr("x", 0)
        .attr("height", yScale.bandwidth())
        .attr("y", function(d) { return yScale(d.skill); })
        .attr("width", function(d) {return xScale(Math.random() + parseInt(d.rating)); })
        .style('fill', defaultBarColor)
        .style('opacity', 0.8)
        .on('click', function(d) {

          var thisBarClass = this.classList[1]

          tooltip
            .style("left", d3.event.pageX - 50 + "px")
            .style("top", d3.event.pageY - 70 + "px")
            .style("display", "inline-block")
            .html(d.details);

          d3.selectAll('.bar')
            .style('fill', defaultBarColor)
            .transition()
            .duration(700)
            .attr("width", function(d) {return xScale(Math.random() + parseInt(d.rating)); })
            
          d3.select(this)
            .style('fill', '#ed6e1a')

        });


    skillChart.append("g")
        .attr("class", "y axis")
        .call(yAxis);

  }
}

// Draw for the first time to initialize.
resize();

// Redraw based on the new size whenever the browser window is resized.3
window.addEventListener("resize", resize);