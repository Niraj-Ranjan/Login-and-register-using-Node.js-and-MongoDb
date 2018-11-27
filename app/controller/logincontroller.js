var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended:false});
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb+srv://demo:qwerty123@cluster0-d86ug.mongodb.net/loginregister?retryWrites=true';





module.exports = (function(app){
  app.get('/', function(req,res){
    res.render('home');
  });
  app.get('/register',function(req,res){
    res.render('register');
  });
  app.get('/Welcome',function(req,res){
    res.render('welcome');
  });


  app.get('/index',function(req,res){
    res.render('index');
  });


  
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
  
  
  
  
  // https://scotch.io/tutorials/use-expressjs-to-get-url-and-post-parameters
app.post('/demo', function (req, res) {
    //console.log(req.body);

    var username = req.body.uname;

    var password = req.body.pword;

    MongoClient.connect(url, function (err, db) {

        if (err) {
            throw err;
        }

        //console.log("Connected successfully to server");

        var users = db.collection('register');

        users.findOne({
            id: uname
        }, function (err1, data) {
            if (err1) {
                throw err1;
            }

            if (data !== null) {

                if (data.password == password) {
                    res.send(data);

                    //console.log(username + " logged in.");
                } else {
                    res.send("false");
                    //console.log(username + " entered incorrect password.");
                }

            } else {
                res.send("invalid");
                //console.log(username + " does not exist.");
            }
            db.close();
        });
    });


});


//register to DB================================================================
app.post('/regiterToDb',urlencodedParser,function(req,res){
 var obj = JSON.stringify(req.body);
 var jsonObj = JSON.parse(obj);



 MongoClient.connect(url, function(err, db) {
   var dbo = db.db("loginregister");
       dbo.collection("register").insertOne(jsonObj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
       });
        //res.render('completeprofile',{profileData:req.body});
       });


  });


  });
