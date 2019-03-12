var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs')

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

  if(msg != null){
    var word = msg.split(" = ");
    if(word[0] == "demain"){
      if(word[1] != null){
        var obj = []
        obj.push({demain: word[1]});
        fs.writeFileSync('reponses.json', JSON.stringify(obj))
        console.log("Merci pour cette information")
      } else {
        //console.log("bad");
        var file = fs.readFileSync('reponses.json')
        var newFile = JSON.parse(file);
        var key;
        for (key in newFile) {
          if (newFile.hasOwnProperty(key)) {
              console.log(key + " = " + newFile[key]);
          }
        }

      }
    }
  }


})

app.listen(port, () => {
  console.log("Server is up and listnening on port " + port + "...");
})
