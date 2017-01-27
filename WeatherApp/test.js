var request = require("request");



request('https://www.googlxxxxxe.com', function (error, response, body){
    if (!error && response.statusCode == 200){
        console.log(body);
    }
    
    else {
        console.log("Something went wrong :/");
        console.log(error);
    }
    
})