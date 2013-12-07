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

function curPage(){
  return parseInt(document.getElementById('page-location').innerText);
}

function incrementCurPage() {
  document.getElementById('page-location').innerText = (1 + curPage());
}

function setCurPageToZero() {
  document.getElementById('page-location').innerText = 0;
}

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

  xhr.open("GET","/api/v1/blog/"+curPage()+".json",true);

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
