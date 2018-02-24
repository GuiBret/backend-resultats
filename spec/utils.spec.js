const Utils = require("../node_modules/Utils");

describe("utils.getCompetitionsByCountryId", function(){
   beforeAll(function() {
       this.utils = new Utils();
   });
    
    it("should return the correct elements for each competition", function() {
        expect(this.utils.getCompetitionsByCountryId("en").length).toEqual(4);
        expect(this.utils.getCompetitionsByCountryId("nl").length).toEqual(1);
        expect(this.utils.getCompetitionsByCountryId("fr").length).toEqual(2);
        expect(this.utils.getCompetitionsByCountryId("de").length).toEqual(3);
        expect(this.utils.getCompetitionsByCountryId("es").length).toEqual(1);
        expect(this.utils.getCompetitionsByCountryId("pt").length).toEqual(1);
        expect(this.utils.getCompetitionsByCountryId("it").length).toEqual(2);
        expect(this.utils.getCompetitionsByCountryId("eu").length).toEqual(1);
        expect(this.utils.getCompetitionsByCountryId("au").length).toEqual(1);
        
    });
    
    it("should return -1 if the passed argument is not defined", function() {
        expect(this.utils.getCompetitionsByCountryId("FD")).toEqual(-1);
    });
});

describe("utils.generateRequest", function() {
    
    beforeAll(function() {
        this.utils = new Utils();
        
    })
   it("should return a query letting you search all competitions in the database for the current season", function() {
       expect(this.utils.generateRequest({request_type: "competitions"})).toEqual("http://api.football-data.org/v1/competitions");
   });
    
    it("should return a query letting you search all competitions in the database for a specific season", function() {
       expect(this.utils.generateRequest({request_type: "competitions", season: "2015"})).toEqual("http://api.football-data.org/v1/competitions?season=2015");
   });
    
    it("should return a query letting you search all results in the database for a specific competition", function() {
       expect(this.utils.generateRequest({request_type: "results", "competition_id": "255"})).toEqual("http://api.football-data.org/v1/competitions/255/fixtures");
   });
    
    it("should return a query letting you search the results of a specific matchday in the database for a specific competition", function() {
       expect(this.utils.generateRequest({request_type: "results", "competition_id": "255", "matchday": "11"})).toEqual("http://api.football-data.org/v1/competitions/255/fixtures?matchday=11");
   });
    
    it("should return a query letting you search the ranking of a competition", function() {
       expect(this.utils.generateRequest({request_type: "ranking", "competition_id": "255"})).toEqual("http://api.football-data.org/v1/competitions/255/leagueTable");
   });
    
    it("should return a query letting you search the ranking of a competition at a specific matchday (to be implemented separately)", function() {
       expect(this.utils.generateRequest({request_type: "ranking", "competition_id": "255", "matchday": "11"})).toEqual("http://api.football-data.org/v1/competitions/255/leagueTable?matchday=11");
   });
    
    it("should return a query letting you search all teams in a competition", function() {
       expect(this.utils.generateRequest({request_type: "teams_in_championship", "competition_id": "255", })).toEqual("http://api.football-data.org/v1/competitions/255/teams");
   });
    
    it("should return a query letting you search all players in a team", function() {
       expect(this.utils.generateRequest({request_type: "team_roster", "team_id": "255", })).toEqual("http://api.football-data.org/v1/teams/255/players");
   });
    
    it("should return a query letting you search info in a team", function() {
       expect(this.utils.generateRequest({request_type: "team_info", "team_id": "255", })).toEqual("http://api.football-data.org/v1/teams/255");
   });
    
});

describe("utils.getCountryClass", function() {
    beforeAll(function() {
            this.utils = new Utils();
    });
    
    it("should return the correct value for specific competitions", function() {
        expect(this.utils.getCountryClass("PL")).toEqual("england");
        
        expect(this.utils.getCountryClass("DED")).toEqual("netherlands");
        expect(this.utils.getCountryClass("FL1")).toEqual("france");
        expect(this.utils.getCountryClass("BL1")).toEqual("germany");
        expect(this.utils.getCountryClass("SA")).toEqual("italy");
        expect(this.utils.getCountryClass("BSA")).toEqual("brazil");
        expect(this.utils.getCountryClass("AAL")).toEqual("australia");
        expect(this.utils.getCountryClass("CL")).toEqual("europe");
    });
});


describe("utils.getCompetitionsById", function() {
    beforeAll(function() {
        this.utils = new Utils();
    });
    
    it("should return the correct competitions for specific countries", function() {
       let result = this.utils.getCompetitionsByCountryId("de");
        
        expect(result.length).toEqual(3);
    });
});