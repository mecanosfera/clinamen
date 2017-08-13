var express    = require('express');
var app        = express();
var helmet		 = require('helmet');
var bodyParser = require('body-parser');
var morgan     = require('morgan');
var mongoose   = require('mongoose');
var config     = require('./config');
var path       = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	next();
});

app.use(helmet());
app.use(morgan('dev'));

mongoose.connect(config.database);

app.use(express.static(__dirname + '/app/apps/main'));

var apiRoutes = require('./app/api/routes/api')(app, express);
//var editorRoutes = require('./app/api/routes/editor')(app, express);

app.use('/api', apiRoutes);
//app.use('/editor', editorRoutes);

app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname + '/app/apps/main/index.html'));
});

app.listen(config.port);
console.log('Magic happens on port ' + config.port);
