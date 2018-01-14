const express = require('express'),
      app = express(),
      ConnectionManager = require("../node_modules/ConnectionManager"),
      http = require("http");
/*
describe("app routing", function() {
    beforeAll(function() {
        this.cm = new ConnectionManager(app);
        app.listen(8080);
    });
    
    it("should trigger getCountryList when /countries/ is triggered", function(done) {
        spyOn(this.cm, "getCountryList");
        //this.cm.getCountryList();
        http.get("http://127.0.0.1/countries/", (res) => {
           console.log('Coucou'); 
            expect(this.cm.getCountryList).toHaveBeenCalled();
            done();
        });
        console.log("app countries");
       //app.get("/countries/"); 
    });
});
*/

describe("cm.getCountryList", function() {
    
    beforeAll(function() {
       this.cm = new ConnectionManager(app);
        this.res = { // Fake res object
            send: function() {
                
            }
        }
    });
    
    it("should check if the utils.getCountryList function has been called", function() {
        spyOn(this.cm.utils, "getCountryList");
        this.cm.getCountryList({}, this.res);
        
        expect(this.cm.utils.getCountryList).toHaveBeenCalled();
        
    });
    it("should return the list of all available countries and their ID", function() {
        spyOn(this.res, "send");
        this.cm.getCountryList({}, this.res);
        
        expect(this.res.send).toHaveBeenCalledWith(jasmine.any(Object));
    })
});

describe("cm.getCountryList", function() {
    
    beforeAll(function() {
       this.cm = new ConnectionManager(app);
        this.res = { // Fake res object
            send: function() {
                
            }
        }
    });
    
    it("should check if the utils.getCountryList function has been called", function() {
        spyOn(this.cm.utils, "getCountryList");
        this.cm.getCountryList({}, this.res);
        
        expect(this.cm.utils.getCountryList).toHaveBeenCalled();
        
    });
    it("should return the list of all available countries and their ID", function() {
        spyOn(this.res, "send");
        this.cm.getCountryList({}, this.res);
        
        expect(this.res.send).toHaveBeenCalledWith(jasmine.any(Object));
    });
});

describe("cm.getCompetitionResults", function() {
   beforeAll(function() {
       this.cm = new ConnectionManager(app);
        this.res = { // Fake res object
            send: function() {
                
            }
        };
       this.req = {
           params: {
               idcompetition: 398 // Premier League
           }
       }
   });
    
    it("should check if getCompetitionResults has return the proper data", function(done) {
        
       this.cm.getCompetitionResults(this.req, this.res);
        done();
    });
});