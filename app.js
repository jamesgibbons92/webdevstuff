var exp = require("express");
var app = exp();

app.get("/test", function(req, res){
    res.send("Hi there");
});
app.post("/");




app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started");
});