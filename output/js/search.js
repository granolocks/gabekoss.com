var searchTerm;
var searchParts;
var results;
$(document).ready(function(){
  $("#search").keyup(function(){
    results = [];
    mergedResults = [];
    searchTerm = $("#search").val();
    searchParts = searchTerm.split(' ');

    $(searchParts).each(function(i,tag){
      selector = "li[name*='"+tag+"']";
      x = $(selector);
      results.push(x);
    });

    $(results).each(function(i,resultsArray){
      $(resultsArray).each(function(i,page){
        if(mergedResults.indexOf(page) == -1){
          mergedResults.push(page);
        }
      });
    });


    $("li.search-result").each(function(i,li){
      if(mergedResults.indexOf(li) == -1){
        $(li).hide();
      } else {
        $(li).show();
      };
    });
  });
});
