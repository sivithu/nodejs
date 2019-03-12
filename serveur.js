var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs')

var app = express();
app.use(bodyParser.json());

var port = process.env.PORT || 3000;

app.get("/hello", (req, res) => {
  console.log("Responding to root...");
  res.send("Hello World");
})

/*Ex 1.3*/
/*
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
*/

app.post('/chat', async (req, res) => {
  try {
    // Connection URL
    const url = process.env.MONGODB_URI;
    // Database Name
    const dbName = 'chat-bot';
    const client = new MongoClient(url);
    var msg = req.body.msg;
    await client.connect();
    const db = client.db(dbName);
    const col = db.collection('messages');

    if(msg.split(" = ")[0] == "demain"){
      col.insertMany([{from: 'user', msg: msg}, {from: 'bot', msg: "demain = Mercredi"}]);
      //col.insertMany();
      console.log("Demain : Mercredi");
      res.send("Demain : Mercredi");
    } else {
      console.log("Je ne comprends pas...");
      res.send("Je ne comprends pas...");
    }


    client.close();

  } catch (err) {
    //this will eventually be handled by your error handling middleware
    console.log(err.stack);
  }
});

app.get('/messages/all', async (req, res) => {
  try {
    // Connection URL
    const url = process.env.MONGODB_URI;
    // Database Name
    const dbName = 'chat-bot';
    const client = new MongoClient(url);
    var msg = req.body.msg;
    await client.connect();
    const db = client.db(dbName);
    const col = db.collection('messages');
    console.log(await col.find().toArray());
    res.send("Tableau envoyé");
    client.close();

  } catch (err) {
    //this will eventually be handled by your error handling middleware
    console.log(err.stack);
  }
});

app.delete('/messages/last', async (req, res) => {
  try {
    // Connection URL
    const url = process.env.MONGODB_URI;
    // Database Name
    const dbName = 'chat-bot';
    const client = new MongoClient(url);
    var msg = req.body.msg;
    await client.connect();
    const db = client.db(dbName);
    const col = db.collection('messages');
    var arr = await col.find().toArray();
    var idDelete = arr[arr.length-1]._id;
    col.deleteOne({_id: idDelete});
    console.log(await col.find().toArray());
    res.send("Suppresion effectué");
    client.close();
  } catch (err) {
    //this will eventually be handled by your error handling middleware
    console.log(err.stack);
  }
});

app.listen(port, () => {
  console.log("Server is up and listnening on port " + port + "...");
})
