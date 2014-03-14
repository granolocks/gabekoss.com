---
title: Serving Static Nanoc Site Files With Ruby 1.8
created_at: 2014-03-14 16:56
updated_at: 2014-03-14 16:56
kind: blog-post
author: Gabe Koss
summary: Using a simple Sinatra app to serve a simple index.html based static site.
tags: 
  - nanoc
  - sinatra
  - ruby-1.8
--- 

This blog is written using a static site generator called Nanoc. Nanoc is a
great tool to generate fast and stable static sites (like this one!).

I recently created a small Nanoc based wiki type site for a friend.
Unfortunately due to a legacy laptop she can only run Ruby 1.8 so I was trying
to figure out a good way to serve the files. 

They file tree looks something like this.

```
blog/2013/11/be_your_own_boss/index.html
blog/2013/11/introduction_to_elastic_search/index.html
...
````

I assumed I could do this simply enough with Sinatra and this is what I came up
with. 

```ruby
#!/usr/bin/env ruby
require 'rubygems'
require 'sinatra'

class Ruby18App < Sinatra::Base
  set :public_folder, Proc.new { File.join(root, "output") }

  get "*" do
    unless request.path.split('/').last == "index.html"
      new_path = File.join(request.path, "index.html")
      redirect to(new_path)
    end
  end
  run! if app_file == $0
end
```

Note that I had to redirect paths to take into account the `index.html` files.
