var exp = require("express"),
    app = exp(),
    mong = require("mongoose"),
    request = require("request"),
    bodyParser = require("body-parser");

require('./tools.js')();
//var ejs = require('ejs')
app.set("view engine", "ejs");
app.use(exp.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

// MongoDB connection
mong.connect("mongodb://localhost/weatherApp", function(err){
    if(err){
        console.log("ERROR CONNECTING TO MONGDB, did you start it?");
        process.exit();
    }
});

// Schema setup
var cacheSchema = new mong.Schema({
    date: Date,
    data: Object
});

console.log(Date.now());




var Cache = mong.model("Cache", cacheSchema);

/* CREATE TEST
Cache.create(
    {
        date: "002222200",
        data: "{dummy: \"json\", data: \"test\"}"
    }, function(err, cacheTest){
        if(err){
            console.log(err);
        }
        console.log("Newly create cache object");
        console.log(cacheTest);
    }); */

app.get("/get/:city", function(req, res) {
    var city = req.params.city;
    // Boolean variable for setting cityCache to false. For checking cached responses against city ibput
    var cityCached = "";
    var cityCachedIdx = null;
    // Check cache in mongodb
    // If there is a response from atleast 30 mins ago, make new request.
    // Stops load on openweatherapi

    Cache.find({
        date: {
            // 10 mins ago
            $gt: new Date(Date.now() - 1000 * 60 * 60)
        }
    }, function(err, caches) {
        if (err) {
            console.log("There was an error retrieving cacches");
            console.log(err);
        }
        else {
            //console.log(caches);
            // If returned object from query is empty, there are no uptodate caches. So call API
            if (isEmptyObject(caches)) {
                console.log("It's empty!");
                //If no cache is found, then call api
                requestCurrent(city, res);
            }
            else {
                //It is not empty, so render the data from cache.
                // First we check if the city is one of the cached.
                console.log("Not empty, now lets search for the city")
                var i = 0;
                var idx = null;
                for (var i = 0; i <= caches.length; i++) {
                    console.log(i);
                    try {
                        if (caches[i].data.name.toUpperCase() == city.toUpperCase()) {
                            var idx = i;
                        }
                    }
                    catch (e) {
                        console.log("catch out of bounds array");
                    }

                }
                if (!idx) {
                    console.log("City cache not found, must request");
                    requestCurrent(city, res);
                }
                else if (idx) {
                    //TODO what iff there are multiple objects in cache returned
                    console.log("Found a cached item for city " + city + ", rendering!");
                    res.render("weather", {
                        data: caches[idx].data
                    });
                }
                else {
                    console.log("Something unexpected happened lol");
                }
            }
        }
    });
});




// b75650e91020f77be2ebd7afcaebdb84


function requestCurrent(city, res) {
    console.log("No up-to-date cache found, calling the weather api");
    //TODO what happens if the response is not 200??
    request('http://api.openweathermap.org/data/2.5/weather?q=' + city + ',uk&appid=b75650e91020f77be2ebd7afcaebdb84', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            //console.log(data);
            // Store response in cache
            var currentCache = {
                date: getDateTime(),
                data: data
            };
            //console.log(currentCache);
            Cache.create(currentCache, function(err, caches) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("Stored response in cache");
                }
            });
            res.render("weather", {
                data: data
            });
        }
        else {
            console.log(error);
        }
    });
}
//TODO Historical
//TODO Grapsh

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has started");
});
