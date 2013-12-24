var Search = function(searchTerm) {
  this.searchTerm = searchTerm;
  this.valid_search = function(){
    return (
      (this.searchTerm != '') &&
      (this.searchTerm != null) &&
      (this.searchTerm.replace(/ /,'') != '')
    );
  };
  this.getResults = function(){
    var res = new Result,
        parts = this.searchTerm.split(' '),
        whyGodwhy = this;
    $(parts).each(function(i,part){
      if (part != "") {
        res.results.push(whyGodwhy.getResultElements(part));
      };
    });
    return res;
  };
  this.getResultElements = function(string){
    var selector = "li[name*='"+string.toLowerCase()+"']";
    return $(selector);
  };
};

var Result = function() {
  this.results = [];
  this.el = 'li.search-result';

  this.display_results = function(){
    var merged = this._and_results();

    $(this.el).each(function(i,li){
      if(merged.indexOf(li) == -1){
        $(li).hide();
      } else {
        $(li).show();
      };
    });
  };

  this._and_results = function(){
    var and_results = [],
        res = this;

    $(res.results[0]).each(function(i,r){
      var include = true;

      $(res.results).each(function(i,sub_array){
        sub_array = $.makeArray(sub_array);

        if(sub_array.indexOf(r) == -1){
          include = false;
        };
      });
      if(include == true){
        and_results.push(r);
      };
    });
    return and_results;
  };
};


$(document).ready(function(){
  // On key strokes of the search input field...
  $('#search').keyup(function(){

    // Initialize a new search
    var searchTerm = $('#search').val(),
        search = new Search(searchTerm),
        results;

    // Search and Destroy
    if( search.valid_search() ){
      results = search.getResults();
      results.display_results();
    } else {
      // hide everything
      $('li.search-result').each(function(i,li){
        $(li).hide();
      });
    };
  });
});

