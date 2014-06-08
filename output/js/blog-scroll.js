function buildPost(post) {
  var output;
  var h2;
  var summary = post.summary;
  var readmore;
  var tags;

  output = "<p> <small> <em> Written "+ post.created_at +" by "+ post.author +" </em> </small> </p>";

  if (post.redirect == null) {
    h2       = "<a href='"+ post.path +"'>"+ post.title +"</a>";
    readmore = "<a href='"+ post.path +"'>read post ...</a>";
  } else {
    h2       = "<a href='"+ post.redirect_path +"' target='_blank'>"+ post.title +"</a>";
    readmore = "<a href='"+ post.path +"'>visit link ...</a><br/><small>This is an external link.</small>";

  }

  output += "<h2>" + h2       + "</h2>";
  output += "<p>"  + summary  + "</p>";
  output += "<p>"  + readmore + "</p>";

  if (post.tags) {
    tags = "<hr/> <p class='tags'>"
      for (var i in post.tags) {
        tag = post.tags[i];
        url_tag = tag.replace(" ","_");

        tags += "<a href='/tags/"+ url_tag +"'>"+ tag +"</a>";
      }
    tags += "</p>";
    output += tags;
  }
  return output;
}

function addPosts(posts_array){
  mainDiv = document.getElementById("main");

  for (var i in posts_array) {
    post = posts_array[i];

    var postDiv = document.createElement('div');
    postDiv.className += "post-summary";
    postDiv.innerHTML = buildPost(post);

    mainDiv.appendChild(postDiv);
  }
}


// Current Page Number, Should Be '1' When it first loads.
function curPage(){
  return parseInt(document.getElementById('page-location').innerHTML);
}

// Increment Current Page Number by 1
function incrementCurPage() {
  document.getElementById('page-location').innerHTML = (1 + curPage());
}

// Set Current Page Number to 0 so it stops working
function setCurPageToZero() {
  document.getElementById('page-location').innerHTML = 0;
}

// Append content when there is nothing else to load
function addFinalDiv() {
  mainDiv = document.getElementById("main");

  var div = document.createElement('div');
  div.className += "no-more-posts";
  div.innerHTML = "<p style='text-align:center'>You've reached the very end...</p>";
  mainDiv.appendChild(div);
}

function getNextPageOfPosts() {
  xhr = new XMLHttpRequest;
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        incrementCurPage();
        addPosts(JSON.parse(xhr.response));
      } else {
        setCurPageToZero();
        addFinalDiv();
      }
    }
  };

  nextPageJson = '/api/v1/blog/'+curPage()+'.json'
  xhr.open("GET",nextPageJson,true);


  if (curPage() >= 1) {
    xhr.send();
  }
};

window.onscroll = function(x) {
  if ( curPage() != 0) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      getNextPageOfPosts();
    }
  }
}
