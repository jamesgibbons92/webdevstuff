//var exp = require("express");
var request = require("request");
//var app = exp();

request('https://www.googlxxxxxe.com', function (error, response, body){
    if (!error && response.statusCode == 200){
        console.log(body);
    }
    
    else {
        console.log("Something went wrong :/");
        console.log(error);
    }
    
})







/*
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started");
});*/