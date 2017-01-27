var exp = require("express");
var app = exp();

app.get("/", function(req, res){
    res.send("Hi there");
});

app.post("/");

app.get("/speak/:animal", function(req, res){
 /*   switch (req.params.animal){
        case "pig":
            // 
            var sayWhat = "Oink";
            break;
        case "cow":
            var sayWhat = "Moo";
            break;
        case "dog":
            var sayWhat = "Woof! Woof!";
            break;
        default:
            var sayWhat = null;
    }    
    
    if (sayWhat){ 
        res.send("The " + req.params.animal + " says '" + sayWhat +"'") 
        
        
    } else {
        res.send(("Not a valid animal!"));
    } */
    
    var sayWhat = {
        dog: "Woof! Woof!",
        pig: "Oink!",
        cat: "Meow",
        human: "Piss off"
    }

    var animal = req.params.animal.toLowerCase();
    var sound = sayWhat[animal];
    if (sound){
        res.send("The " + animal + " says '" + sound +"'");
    } else {
        res.send("Not valid animal");
    }
    
});

app.get("/repeat/:str/:num", function(req, res){
    var sumString = req.params.str;
    var times = (req.params.num);
    try{
        for (var i = 1; i < times; i++){
            sumString += (", " + req.params.str);
        }
        res.send(sumString);
    }
    catch(err){
        console.log("ERRORS ENCOUNTERED: " + err.message);
    }
        
    
});
    


app.get("*", function(req, res){
    res.send("Everything else...");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started");
});