
const $ = require('jquery');
const d3 = require('d3');
const css = require("!style!css!sass!./../sass/main.scss");

const mainTemplate = require('./templates/main.hbs');



$(document).ready(function() {
	const aDiv = document.createElement('div');
	aDiv.innerHTML = mainTemplate();
	$('body').append(aDiv);

	const barsChart = require('./blocks/barsChart.js');
	const circleChart = require('./blocks/circles.js');
});


