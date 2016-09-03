module.exports = {
  // See http://brunch.io for documentation.
  files: {
    javascripts: {
    	joinTo: {
    		'js/app.js': /^app/
    	}
    },
    stylesheets: {joinTo: 'css/main.css'},
    templates: {joinTo: 'js/app.js'}
  }
}
