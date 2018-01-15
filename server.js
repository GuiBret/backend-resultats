var express = require("express"),
    app = express(),
    http = require("http"),
    ConnectionManager = require("./node_modules/ConnectionManager");




app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



let cm = new ConnectionManager(app);


app.listen(3000);
