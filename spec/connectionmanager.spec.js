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
               idcompetition: 426 // Premier League 2016
           }
       }
   });
    
    it("should have returned proper data", function(done) {
        spyOn(this.res, "send");
       this.cm.getCompetitionResults(this.req, this.res).then((data) => {
           
            expect(this.res.send).toHaveBeenCalledWith(jasmine.any(Object));  
            done();
       });
        
    });
});



describe("cm.getCompetitionRankings", function() {
    
    beforeAll(function() {
        this.cm = new ConnectionManager(app);
        this.res = { // Fake res object
            send: function() {
                
            }
        }
        
        this.req = {
            idcompetition: 432
        }
    })
   it("should not return anything if it is not a championship", function(done) {
       this.cm.getCompetitionRankings(this.req, this.res).then((data) => {
           console.log("Data : ");
            console.log(data);
           done();
       });
   });
});



describe("cm.getData", function() {
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
    
    it("should catch an error if the data is restricted (prior to 2016)", function(done) {
        
        this.cm.getData("http://api.football-data.org/v1/competitions/398").then((data) => {
            //console.log('Attente restricted');
            //expect(err.error).toEqual("The resource you are looking for is restricted");
            done();
        }).catch((err) => {
            console.log('Attente restricted');
            expect(err.error).toEqual("The resource you are looking for is restricted");
            done();
    
        });
    });
    
    it("should return proper data if we select the results of a specific competition", function(done) {
        this.cm.getData("http://api.football-data.org/v1/competitions/426/fixtures/").then((data) => { // PremierLeague 2016
    
            expect(data.count).toEqual(380); // Should contain 380 games
            done();
        })
    });
    
    it("should return proper data if we select the ranking of a selected competition", function(done) {
        this.cm.getData("http://api.football-data.org/v1/competitions/426/leagueTable").then((data) => {
           expect(data.matchday).toEqual(38); // The championship should be finished 
            done();
            
        });
    });
    
});