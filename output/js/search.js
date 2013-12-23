var searchTerm;
var searchParts;
var results;

$(document).ready(function(){
  $("#search").keyup(function(){
    results = [];
    mergedResults = [];
    searchTerm = $("#search").val();

    if( (searchTerm != "") && (searchTerm != null)){
      searchParts = searchTerm.split(' ');

      $(searchParts).each(function(i,tag){
        if(tag != ""){
          selector = "li[name*='"+tag.toLowerCase()+"']";
          x = $(selector);
          results.push(x);
        }
      });

      //
      // results = [[x,y],[x,z]..]
      //
      $(results[0]).each(function(i,page){
        var include = true;

        $(results).each(function(i,resultsArray){
          resultsArray = $.makeArray(resultsArray);

          if(resultsArray.indexOf(page) == -1){
            include = false;
          }
        });

        if(include == true){
          mergedResults.push(page);
        }
      });


      $("li.search-result").each(function(i,li){
        if(mergedResults.indexOf(li) == -1){
          $(li).hide();
        } else {
          $(li).show();
        };
      });
    } else {
      $("li.search-result").each(function(i,li){
        $(li).hide();
      });
    }
  });
});
