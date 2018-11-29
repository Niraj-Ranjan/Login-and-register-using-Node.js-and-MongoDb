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

  app.get('/phonedetails',function(req,res){
    res.render('phonedetails');
  });

  app.get('/show',function(req,res){
    res.render('show');
  });



  // Login TO DB==================================================================
  app.post('/demo',urlencodedParser,function(req,res){
   MongoClient.connect(url, function(err, db) {
     var dbo = db.db("loginregister");

   dbo.collection('register').findOne({ name: req.body.name}, function(err, user) {
             if(user === null){
               res.send("false");
            }else if (user.name == req.body.name && user.pass == req.body.pass){
            res.send("true");
          } else {
            console.log("Credentials wrong");
            res.send("false");
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






  //register to phone details================================================================

  app.post('/phonedetails',urlencodedParser,function(req,res){
   var obj = JSON.stringify(req.body);
   var jsonObj = JSON.parse(obj);



   MongoClient.connect(url, function(err, db) {
     var dbo = db.db("loginregister");
         dbo.collection("phonedetails").insertOne(jsonObj, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
         });
          //res.render('completeprofile',{profileData:req.body});
         });


    });





    //get list of all phone details================================================================

    app.post('/getphonedetails',urlencodedParser,function(req,res){


     MongoClient.connect(url, function(err, db) {
       var dbo = db.db("loginregister");
       data:'';
           dbo.collection('phonedetails').find().toArray(function(err, docs) {
          if (err) throw err;
          console.log(docs);
          res.render('show',{data:docs});
          db.close();
           });
            //res.render('completeprofile',{profileData:req.body});
           });


      });


      app.get('/delete', function(req, res, next) {

  var id = req.query.phonename;

  MongoClient.connect(url, function(err, db) {
    var dbo = db.db("loginregister");

    if(err) { throw err;  }

    dbo.collection("phonedetails").deleteOne(id, function(err, obj) {
       if (err) throw err;
       console.log("1 document deleted");
       db.close();
     });

  });

});









  });

