
/*
 * GET home page.
 */

 function Router() {
 	var launcher = require('../launcher');
 	launcher = new launcher.RocketLauncher();

 	var index = function(req, res){
  		res.render('index', { title: 'Foam Dart Rocket Launcher' })
	};

	var perform_command = function(req, res){
	 	
	  	
	  	launcher.runCommand(req.params.command);
	  	res.send(req.params.command);
	};

	return {
		index : index,
		perform_command : perform_command
	}
 }

 exports.Router = Router;
