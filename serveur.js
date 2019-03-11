var express = require('express');

var app = express();

var port = process.env.PORT || 3000;

app.get("/hello", (req, res) => {
  console.log("Responding to root...");
  res.send("Hello World");
})

app.listen(port, () => {
  console.log("Server is up and listnening on port " + port + "...");
})
