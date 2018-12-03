

var express = require('express');
var app = express();
var loginController = require('./controller/logincontroller');
app.set('view engine','ejs');
app.set('views','app/views');
app.use(express.static('app/public'));
app.use(express.static('app/controller'));
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
app.use(express.bodyParser());
loginController(app);
app.listen(process.env.PORT);






//var express = require('express');
//var app = express();
//var path = require('path');
//var reload = require('reload');
//var favicon= require('servo-favicon');
//var cookieParser = require('cookie-parser');
//var bodyParser = require('body-parser');

//app.set('port', process.env.PORT || 3000);


//app.set('view engine','ejs');
//app.set('views','app/views');

//app.use(express.static('app/public'));


//app.use(require('./routers/index'));
//app.use(require('./routers/register'));
//app.use(require('./routers/feedback'));
//app.use(require('./routers/api'));














//var server = app.listen(app.get('port'), function()

//{

//console.log('listen to port ' +app.get('port'));
//});
