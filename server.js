var express = require("express");
var app = express();
app.listen(3020,()=>{
	console.log("listening at port 3020");
});
app.use(express.static(__dirname));

var mongoose = require("mongoose");
var dbUrl = "mongodb://localhost:49123/chatappdb";
var Message = mongoose.model("Message",{ name : String, message : String});

mongoose.connect(dbUrl, { useNewUrlParser: true}, (err) => { 
   console.log("mongodb connected",err);
});

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get("/messages", (req, res) => {
  Message.find({},(err, messages)=> {
    res.send(messages);
  });
});

app.post("/messages", (req, res) => {
  var message = new Message(req.body);
  message.save((err) =>{
    if(err)
      sendStatus(500);
    res.sendStatus(200);
  });
});