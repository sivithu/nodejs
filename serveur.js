var express = require('express');

var app = express();

var port = process.env.PORT || 3000;

app.get("/hello", (req, res) => {
  console.log("Responding to root...");
  res.send("Hello World");
})

app.post("chat", (req,res) => {
  var msg = req.msg;
  if(msg == "ville") {
    res.send("Nous sommes à Paris")
  } else if(msg == "météo"){
    res.send("Il fait beau")
  }
})

app.listen(port, () => {
  console.log("Server is up and listnening on port " + port + "...");
})
