## Doge Helper

To manage some of the things that are useful you can create a helper object. 

```ruby 
# in lib/doge.rb
require 'json'
class Doge
  PER_PAGE = 5

  def self.all(itesm)
    items.reject {|i| !(i[:kind] == 'doge-pic') }
  end

   def self.jsonify(doges)
      doges.map! do |doge|
        {
          title:       doge[:title],
          description: doge[:description],
          source:      doge[:source] 
        }
      end
      JSON.generate(doges)
   end
  
   def self.json_erb
     "<%= Doge.json_erb(@item[:doges].dup) %>"
   end
end
```

## Update Rules file

Update the Rules file to generate the "API" which the Javascript will consume
to load the images.

```ruby
preprocess do 
  
  def add_doge_api
    doge_pages = []
    Doge.all(@itesm).each_slice(Doge::PER_PAGE) do |slice| 
      doge_pages << slice 
    end

    doge_pages.each_with_index do |doges, index|
      @items << Nanoc::Item.new(
        Doge.json_erb,
        {extension: "erb",  doges: doges},
        "/api/v1/doge_blog/#{index}.json"
      )
    end
  end

  # Be sure to call it so it gets set up
  add_doge_api
end

compile '/api/v1/blog/*' do
 filter :erb
end

route '/api/v1/dogeblog/*' do
  # remove trailing '/'
  item.identifier.gsub(/\/$/,'')
end
```


## Javascript 'Client'

Okay, I'll be the first to admit this Javascript is pretty gnarly but hey,
Nanoc is great for one off code and this does the job. 

```js
// Current Page Number, Should Be '1' When it first loads.
function curPage(){
  return parseInt(document.getElementById('page-location').innerText);
}

function getNextPackOfDoges() {
  xhr = new XMLHttpRequest;
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        document.getElementById('page-location').innerText = (1 + curPage());
        new_doges = JSON.parse(xhr.response);
        mainDiv = document.getElementById("main");
        for (var i in new_doges) {
          doge = new_doges[i];

          var dogeBody;
          dogeBody  = "";
          dogeBody += "<img src='"+ doge.source +"' title='"+ doge.title +"' />";
          dogeBody += "<h2>"+ doge.title +"</h2>";
          dogeBody += "<p>"+ doge.description +"</p>";

          var dogeDiv = document.createElement('div');
          dogeDiv.className += "doge-pic";
          dogeDiv.innerHTML = dogeBody;

          mainDiv.appendChild(dogeDiv);
        }
      } else {
        document.getElementById('page-location').innerText = 0;
        mainDiv = document.getElementById("main");

        var div = document.createElement('div');
        div.className += "no-more-doges";
        div.innerHTML = "<p style='text-align:center'>Wow Such end Very sad</p>";
        mainDiv.appendChild(div);
      }
    }
  };

  xhr.open("GET","/api/v1/doge_blog/"+curPage()+".json",true);
  if (curPage() >= 1) {
    xhr.send();
  }
};

window.onscroll = function(x) {
  if ( curPage() != 0) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      getNextPackOfDoges();
    }
  }
}
```

## Modify the index

Update the collection index accordingly 

```rb
<% doges = Doge.all(@items)[0..(Doge::PER_PAGE-1)] %>
<% doges.each do |doge| %>
  <div class="doge-pic">
    <img src="<%= doge[:source] %>" title="<%= doge[:title] %>" />
    <h2><%= doge[:title] %></h2>
    <p><%= doge[:description] %></p>
  </div>
<% end %>
<span id="page-location" style="display:none;">1</div>
<script src="/js/doge-scroll.js"></script>
```

The contents of the `.page-location` span will tell the Javascript that the
first page of additional data to request is page 1.

