const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}))



app.get("/", function(req, res) {
    res.sendfile(__dirname + "//index.html");

});

app.post("/report", function(req, res) {
    const city = req.body.city;
    const query = city;
    const apiId = "9cbdf2d543fb6df16e865ca3a38f276f"
    const metric = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiId + "&units=" + metric;
    https.get(url, function(response) {
        console.log(response.statusCode);
        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherLike = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const IMGURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1>The temperature in " + city + " is " + temp + " C. </h1>");
            res.write("<p>The weather description is : " + weatherLike + "</p>");
            res.write("<img src=" + IMGURL + ">")
            res.send();
            const report = req.body.city;
            console.log(report);
        })
    });
});


app.listen(3000, function() {
    console.log("server is running");
})