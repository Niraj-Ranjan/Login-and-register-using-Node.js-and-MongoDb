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



  // Login TO DB==================================================================
  app.post('/demo',urlencodedParser,function(req,res){
   MongoClient.connect(url, function(err, db) {
     var dbo = db.db("loginregister");

   dbo.collection('userprofile').findOne({ name: req.body.name}, function(err, user) {
             if(user === null){
               res.end("Login invalid");
            }else if (user.name === req.body.name && user.pass === req.body.pass){
            res.render('Welcome');
          } else {
            console.log("Credentials wrong");
            res.end("Login invalid");
          }
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
