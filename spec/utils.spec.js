const Utils = require("../node_modules/Utils");

describe("utils.getCompetitionsByCountryShort", function(){
   beforeAll(function() {
       this.utils = new Utils();
   });
    
    it("should return the correct elements for each competition", function() {
        expect(this.utils.getCompetitionsByCountryShort("en").length).toEqual(4);
        expect(this.utils.getCompetitionsByCountryShort("nl").length).toEqual(1);
        expect(this.utils.getCompetitionsByCountryShort("fr").length).toEqual(2);
        expect(this.utils.getCompetitionsByCountryShort("de").length).toEqual(3);
        expect(this.utils.getCompetitionsByCountryShort("es").length).toEqual(1);
        expect(this.utils.getCompetitionsByCountryShort("pt").length).toEqual(1);
        expect(this.utils.getCompetitionsByCountryShort("it").length).toEqual(2);
        expect(this.utils.getCompetitionsByCountryShort("eu").length).toEqual(1);
        expect(this.utils.getCompetitionsByCountryShort("au").length).toEqual(1);
        
    });
    
    it("should return -1 if the passed argument is not defined", function() {
        expect(this.utils.getCompetitionsByCountryShort("FD")).toEqual(-1);
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


describe("utils.getCountryCaption", function() {
    beforeAll(function() {
        this.utils = new Utils();
    })
    
    it("should return the correct caption when provided an ID", function() {
        expect(this.utils.getCountryCaption("en")).toEqual("england");
        expect(this.utils.getCountryCaption("de")).toEqual("germany");
        expect(this.utils.getCountryCaption("fr")).toEqual("france");
    });
})