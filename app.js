var express = require('express')
  , routes = require('./routes')

var app = express();
  
// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
  });

app.get('/', routes.headlines);
app.get('/fanmap', routes.fanmap);
app.get('/fanmap/display',routes.get);
app.put('/fanmap/location', routes.put);

app.listen(3333);
console.log("Express server listening to 3333");