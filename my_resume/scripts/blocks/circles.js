
var width = 460,
    height = 1200;
    factor = 5
 
var svg = d3.select("#bubbleChart").append("svg")
    .attr("width", width)
    .attr("height", height)
    
d3.json("../../my_resume/data/work-exprience-title.json", function(json) {
    /* Define the data for the circles */
    var elem = svg.selectAll("g myCircleText")
        .data(json.years)
  
    /*Create and place the "blocks" containing the circle and the text */  
    var elemEnter = elem.enter()
        .append("g")
        .attr('class','circles')
        .attr("transform", function(d){return "translate(100, "+d.x+")"})
 
    /*Create the circle for each block */
      var circle = elemEnter.append("circle")
          .attr("r", function(d){return d.r} )
          .attr("cx", 0)
          .attr("cy", 0)
          .attr("fill", "#E88E09")
          /*
          .on( 'mouseenter', function() {
            d3.select( this )
              .transition()
              .attr("transform", "scale(" + 1 / 10 +")")
          } )
          
          .on( 'mouseleave', function() {
            d3.select( this )
              .transition()
              .attr( 'r', function(d){return d.r * 10} )
          } )
          */
          .transition()
          .duration( 1000 )
          .attr("transform", "scale(" + 1 / factor +")")
          .attr( 'r', function(d){return d.r * factor} )
      
    /* Create the text for each block */
    elemEnter.append("text")
        .attr("dx", function(d){return d.rightM})
        .text(function(d){return d.label})
        .style("font-size", function(d){return d.font + "rem"}) 
    
    elemEnter.append("text")
        .attr("class", "title")
        .attr("dx", 120)
        .text(function(d){return d.title})
        .style("font-size", "1.5rem")  

    elemEnter.append("text")
        .attr("class", "client")
        .attr("dx", 120)
        .attr("transform", function(d){return "translate(0, 15)"})
        .text(function(d){return d.client})
        .style("font-size", "1.2rem")  
})
