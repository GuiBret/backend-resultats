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

describe("cm.getCountryList", function() {
    beforeAll(function() {
        this.cm = new ConnectionManager(app);
        this.res = { // Fake res object
            send: function() {
                
            }
        }
        
        this.req = {
            params : {
                
            }
        }
    });
    
    it("should return all competitions to the user ", function(done) {
        
        spyOn(this.res, "send");
        this.cm.getAllCompetitions(this.req, this.res).then((data) => {
          expect(this.res.send).toHaveBeenCalledWith(jasmine.any(Object)); 
            done();
       });
    });
})


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
            params: {
                idcompetition: 432 // Euro 2016, not a championship    
            }
            
        }
    })
   it("should not raise an exception if it is not a championship", function(done) {
       this.cm.getCompetitionRankings(this.req, this.res).then((data) => {
       }).catch((err) => {

           expect(err).toEqual(404);
           done();
       });
   });
    
    it("should return the proper ranking to the client if we select an existing competition", function(done) {
        this.req.params.idcompetition = 426; // Premier League 2016
        spyOn(this.res, "send");
        this.cm.getCompetitionRankings(this.req, this.res).then((data) => {

            expect(this.res.send).toHaveBeenCalledWith(jasmine.any(Object));
            done();
        });
    })
});

describe("cm.getTeamRoster", function() {
    
    beforeAll(function() {
       this.cm = new ConnectionManager(app);
        this.res = { // Fake res object
            send: function() {
                
            }
        };
       this.req = {
           params: {
               teamid: 245 // Non-existing ID
           }
       }
   });
   it("should raise an exception if the ID doesn't match a team", function(done) {

       this.cm.getTeamRoster(this.req, this.res).then(() => {
           
       }).catch((err) => {
           expect(err).toEqual(404);
           done(); 
       });
   });
    
    it("should return the roster to the client if we select an existing team", function(done) {
        this.req.params.teamid = 66; // Manchester United
        spyOn(this.res, "send");
        this.cm.getTeamRoster(this.req, this.res).then((data) => {
           expect(this.res.send).toHaveBeenCalledWith(jasmine.any(Object));
            done();
        }).catch((err) => {

        });
        
    });
});


describe("cm.getTeamInfo", function() {
    
    beforeAll(function() {
       this.cm = new ConnectionManager(app);
        this.res = { // Fake res object
            send: function() {
                
            }
        };
       this.req = {
           params: {
               teamid: 245 // Non-existing ID
           }
       }
   });
   it("should raise an exception if we don't select an existing team", function(done) {
       
       this.cm.getTeamInfo(this.req, this.res).then(() => {
           
       }).catch((err) => {
           expect(err).toEqual(404);
           done(); 
       });
       
   });
    
    it("should return the team info to the client if we select an existing team", function(done) {
        this.req.params.teamid = 66; // Manchester United
        spyOn(this.res, "send");
        this.cm.getTeamInfo(this.req, this.res).then((data) => {
           expect(this.res.send).toHaveBeenCalledWith(jasmine.any(Object));
            done();
        }).catch((err) => {

        });
    });
});



describe("cm.getData", function() {
   beforeAll(function() {
       this.cm = new ConnectionManager(app);
        this.res = { // Fake res object
            send: function() {}
        };

       
   });
    
    it("should catch an error if the data is restricted (prior to 2016)", function(done) {
        
        this.cm.getData("http://api.football-data.org/v1/competitions/398").then((data) => {
        }).catch((err) => {

            expect(err).toEqual(403);
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
            
        }).catch((err) => {
          console.log(err);  
        });
    });
    
});

describe("cm.getCompetitionsByCountry", function() {
    beforeAll(function() {
        this.cm = new ConnectionManager(app);
        this.req = {
            params: {
                "countryid": "en"
            }
        }
        this.res = { // Fake res object
            send: function() {}
        };
       
    });
    
    it("should return the correct competition for a specific country", function(done) {
        spyOn(this.res, "send");
        this.cm.getCompetitionsByCountry(this.req, this.res).then((data) => {
            
            expect(this.res.send).toHaveBeenCalled();
            done();
        })
        
        
    })
})