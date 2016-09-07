module.exports = {
  // See http://brunch.io for documentation.
  files: {
    templates: { joinTo: 'js/app.js'},
    javascripts: {
    	joinTo: {
    		'js/app.js': /^app/
    	}
    },
    stylesheets: {joinTo: 'css/main.css'}
  }
}

