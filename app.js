
/**
 * Module dependencies.
 */

console.log(require('./routes').Router)
var express = require('express')
  , Router = require('./routes').Router;

var app = module.exports = express.createServer();
var router = new Router();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

var listen_port = 80;

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  listen_port = 3033;
});

app.configure('production', function(){
  app.use(express.errorHandler());
  listen_port = 80;
});

// Routes

app.get('/', router.index);
app.get('/perform_command/:command', router.perform_command);

app.listen(listen_port);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
