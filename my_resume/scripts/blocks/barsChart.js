
		// Datas
		var skills= ['Javascript', 'Jquery', 'Sass', 'Html5', 'Css Animation', 'Backbonejs', 'Reactjs', 'Webpack', 'Grunt', 'modular code', 'refactoring', 'clean code', 'UX', 'UI', 'Nodejs', 'Expressjs', 'Testing', 'Photoshop'];
		
		var percent = [75,80,95,80,80,60,60,80,95,90,90,70,80,90,50,55,30,90];
		
		var valueText = ['good','very good','expert','very good','good','good','good','very good','expert','very good','very good','good','very good','expert','basic','basic','','very good'];
		
		var colors = ['#BEFF00', '#E8E20C', '#FFE00D', '#FFE60A', '#FFB203', '#E88E09', '#FF790A', '#FF6E00', '#E84A0C', '#FF2E0D', '#FF3E00', '#E8210C'];


		var xscale = d3.scale.linear()
						.domain([0,100])
						.range([0,250]);

		var yscale = d3.scale.linear()
						.domain([0, skills.length])
						.range([0,400]);

		var colorScale = d3.scale.quantize()
						.domain([0,skills.length])
						.range(colors);

		var canvas = d3.select('#barChart')
						.append('svg')
						.attr({'width':400,'height':550});

		
		var	xAxis = d3.svg.axis();
			xAxis
				.orient('bottom')
				.scale(xscale)

		var	yAxis = d3.svg.axis();
			yAxis
				.orient('left')
				.scale(yscale)
				.ticks(10)
				.tickFormat(function(d,i){ return skills[i]; })
				.tickValues(d3.range(19))

		var y_xis = canvas.append('g')
						  .attr("transform", "translate(150,10)")
						  .attr('id','yaxis')
						  .call(yAxis);

		var x_xis = canvas.append('g')
						  .attr("transform", "translate(150,280)")
						  .attr('id','xaxis')
						  //.call(xAxis);

		// Bars
		var chart = canvas.append('g')
							.attr("transform", "translate(150,0)")
							.attr('id','bars')
							.selectAll('rect')
							.data(percent)
							.enter()
							.append('rect')
							.attr('height',20)
							.attr({'x':0,'y':function(d,i){ return yscale(i)+0; }})
							.style('fill',function(d,i){ return colorScale(i); })
							.attr('width',function(d){ return 0; });

		// Transitions
		var transit = d3.select("svg").selectAll("rect")
						    .data(percent)
						    .transition()
						    .duration(1000) 
						    .attr("width", function(d) {return xscale(d); });

		var transitext = d3.select('#bars')
							.selectAll('text')
							.data(percent)
							.enter()
							.append('text')
							.attr({'x':function(d) {return xscale(d)-100; },'y':function(d,i){ return yscale(i)+13; }})
							.data(valueText)
							.text(function(d){ return d; });




