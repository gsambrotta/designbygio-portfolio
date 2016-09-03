
document.addEventListener('DOMContentLoaded', function() {
  // do your setup here
	console.log('is working!');

	var titleEl = document.getElementById('autoType');
	var keywords = [
		'determinated',
		'entusiath',
		'curious'
	]

	var index = 0;
	var arrCount = 0;

	window.typingAnimation = function () {
		if ( index <= keywords[arrCount].length) {
			titleEl.innerHTML = keywords[arrCount].substr(0, index++);
			setTimeout('typingAnimation()', 100);
		} else {
			arrCount++;
			index = 0;
			if (arrCount === keywords.length) {
				arrCount = 0;
			}
			setTimeout('typingAnimation()', 500);
		}
	}

	typingAnimation();

	// cleartimeout

});


