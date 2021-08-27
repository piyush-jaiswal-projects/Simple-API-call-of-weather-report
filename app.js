const express = require("express");
const https= require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.get("/", function(req, res){

   res.sendFile(__dirname + "/index.html"); 
})

app.post("/", function(req, res){
  
    const query =req.body.cityname;
    const apiKey ="29c878df969f6d6cf58f6f3f23afe22c";
    const units ="metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + ",%20India&appid=" + apiKey + "&units=" + units + "#";
    https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp; 
        const weatherDesc = weatherData.weather[0].description;
        const icon = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png";
        res.write("<p>The weather is currently " + weatherDesc + " </p>");
        res.write("<h1>The temperaure in " + query + " is " + temp + " degrees celsius</h1>");
        res.write("<img src=" +icon + ">");
        res.send();
    })
    });
     
})

app.listen(3000, function(){
    console.log("Server is running on port 3000");
})