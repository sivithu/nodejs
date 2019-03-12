var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs')

var app = express();
app.use(bodyParser.json());

var port = process.env.PORT || 3000;

/*(async function() {
  // Connection URL
  const url = 'mongodb://localhost:27017/test';
  // Database Name
  const dbName = 'test';
  const client = new MongoClient(url);

  try {
    // Use connect method to connect to the Server
    await client.connect();

    const db = client.db(dbName);
    //console.log(db);
    const col = db.collection('dates');

    console.log(await col.find().toArray());

    col.insertOne({date: new Date()});

    console.log(await col.find().toArray());

  } catch (err) {
    console.log(err.stack);
  }

  client.close();
})();*/



app.post('/chat', async (req, res) => {
  try {
    // Connection URL
    const url = 'mongodb://localhost:27017/chat-bot';
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
    const url = 'mongodb://localhost:27017/chat-bot';
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
    const url = 'mongodb://localhost:27017/chat-bot';

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
})

app.listen(port, () => {
  console.log("Server is up and listnening on port " + port + "...");
})
