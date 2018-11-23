$(document).ready(function(){



  $("#regBtn").click(function(){
         $.ajax({
           type : 'GET',
           url : '/register',
           success: function(data){
             $("#regDiv").html(data);
           }
         });
     });
     $("#loginBtn").click(function(){
         $.ajax({
           type : 'GET',
           url : '/index',
           success: function(data){
             $("#loginDiv").html(data);
           }
         });
     });









//=====Login Form Request=============================================
  $("#loginForm").click(function(){
    var uname  = $("#uname").val();
    var upass = $("#upass").val();

    var loginData ={'name': uname,'pass':upass};
console.log(loginData);

    $.ajax({
        type : 'POST',
        url : '/demo',
        data : loginData,
        success: function(data){
        $("#mainDiv").html(data);
        }
      });
  });



  //=====Register Form=============================================
   $("#regForm").click(function(){

     var fullname  = $("#fullname").val();
     var email  = $("#email").val();
     var uname  = $("#uname").val();
     var upass = $("#upass").val();


     var regData ={   'fullname': fullname, 'email': email, 'name': uname,'pass':upass};


console.log(regForm);

       $.ajax({
         type : 'POST',
         url : '/regiterToDb',
         data : regData,
         success: function(data){
         $("#mainDiv").html(data);
         }
       });
   });


});
