/*
 * AUTOCOMPLETE - Data Provider tests
 */


$(document).ready(function() {
  module("Autocomplete: Data provider",{
    setup: function() {
      AutocompleteDataProvider.instance = null;
      this.dataProvider = AutocompleteDataProvider.getInstance();
    }
  });
  
  test("Get instance", function() {
    AutocompleteDataProvider.instance = null;
    var actual = AutocompleteDataProvider.getInstance();
    ok(AutocompleteDataProvider.instance, "Data provider is defined");
    equals(AutocompleteDataProvider.instance, actual, "Data provider is correct");
    equals(AutocompleteDataProvider.getInstance(), AutocompleteDataProvider.instance, "Data provider is singleton");
  });
  
  test("Load data", function() {
    var returnedData = [
      {
        id: 1,
        name: "Teppo Testi"
      }
    ];
    var fetchDataCalledCount = 0;
    this.dataProvider._fetchData = function(url, params) {
      same(url, AutocompleteDataProvider.vars.urls.usersAndTeams, "Urls match");
      fetchDataCalledCount++;
      return returnedData; 
    };
    
    equals(this.dataProvider.get("usersAndTeams"), returnedData, "Correct data is returned");
    same(fetchDataCalledCount, 1, "Data is fetched");
  });
});