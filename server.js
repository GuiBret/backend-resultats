var express = require("express"),
    app = express(),
    http = require("http");




app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get("/", (req, res) => {

    var get_req = http.get("http://api.football-data.org/v1/fixtures?timeFrame=n1", (data_res) => {
        
        let rawData = '';
        data_res.on('data', (chunk) => { rawData += chunk; });
        
        data_res.on('end', () => {
        try {
          const parsedData = JSON.parse(rawData);
            res.header('Access-Control-Allow-Origin', "*");
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            res.header('Access-Control-Allow-Headers', 'Content-Type');
            
            res.send(parsedData);
        } catch (e) {
          console.error(e.message);
        
        }
      
        });
        
    });
    
    
});


app.listen(3000);
