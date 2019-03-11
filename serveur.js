var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.json())

app.get("/hello", (req, res) => {
  console.log("Responding to root...");
  res.send("Hello World");
})

app.post("/chat", (req,res) => {
  var msg = req.body.msg;
  if(msg == "ville") {
    res.send("Nous sommes à Paris")
    console.log("Nous sommes à Paris")
  } else if(msg == "météo"){
    res.send("Il fait beau")
    console.log("Il fait beau")
  }
  console.log(msg);
})

app.listen(port, () => {
  console.log("Server is up and listnening on port " + port + "...");
})
