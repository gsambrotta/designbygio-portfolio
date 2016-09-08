document.addEventListener('DOMContentLoaded', function() {
	typingInit();
	requestAndDisplayProjects();
});


function requestAndDisplayProjects() {
	var xhr;
	var viewEl = document.getElementById('viewProjects');
	var tmp = require('./templates/projects');

	// Moz/Webkit
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	// IE
	} else if (window.ActiveXObject) {
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	//cache results
	var bustCache = '?' + new Date().getTime();

	if(xhr != false){
		xhr.open('GET', '../data/projects.json' + bustCache, true);

		xhr.onload = function() {
			if (this.status >= 200 && this.status < 400) {
				// hide loader div
				var data = JSON.parse(xhr.responseText);
				var compiledHtml = tmp({ works: data });
				viewEl.innerHTML = compiledHtml;
			} else {
				// show error box
				console.log('Error, data fail to load: ' + xhr.status);
			}
		};

		xhr.onerror = function() {
			// show error box
			console.log('Error, connection problem')
		};

		xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		xhr.send();
	}
}

function typingInit() {
	var titleEl = document.getElementById('autoType');
	var keywords = [
		'determined',
		'curious',
		'passionated',
		'sunny',
		'responsible',
		'flexible',
		'enthusiastic'
	]

	var index = 0;
	var arrCount = 0;
	var timer;

	function typingAnimation() {
		if ( index <= keywords[arrCount].length) {
			titleEl.innerHTML = keywords[arrCount].substr(0, index++);
			timer = setTimeout( function() {
				typingAnimation();
			}, 100);
		} else {
			arrCount++;
			index = 0;
			if (arrCount === keywords.length) {
				arrCount = 0;
			}
			timer = setTimeout( function() {
				typingAnimation();
			}, 500);
		}
	}

	return typingAnimation();
}



