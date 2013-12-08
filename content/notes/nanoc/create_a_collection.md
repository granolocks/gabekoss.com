---
title: Nanoc Collections 
updated_at: 2013-12-07 00:35
created_at: 2013-12-07 00:35
---

These are notes about organizing a collection of some type of content (such as
a blog) in nanoc. 

_This is in no way complete or definitive. Just some of my own notes._

## Project: Image Loader

For the purpose of simplifying this example I'm going to create a simple image
blog. Each image in the collection will be a simple markdown file containing
only the following metadata:

```markdown
---
title: Such doge
description: Wow. So doge. Very image.
source: http://i.imgur.com/eh9GPzx.jpg
kind: doge-pic
---
```

This is effectively the 'model' I am using to store the images. This does not
take into account storing images on your site, 

## Set up your index page and content items

First create an index page for the collection in `content/doge_blog.erb`. Add a
simple loop into this page like:

```rb
<% doges = @items.reject {|i| !(i[:kind] == 'doge-pic') } %>
<% doges.each do |doge| %>
  <div class="doge-pic">
    <img src="<%= doge[:source] %>" title="<%= doge[:title] %>" />
    <h2><%= doge[:title] %></h2>
    <p><%= doge[:description] %></p>
  </div>
<% end %>
```

I'm going to host this at `/doge_blog` so I also create the directory
`contents/doge_blog` and make some markdown files in it containing this sort of
item meta data. Here is the contents of the `/doge_blog` directory.

```
content/doge_blog/
-- 001_doge.md
-- 002_doge.md
-- 003_doge.md
-- 004_doge.md
-- 005_doge.md
-- ...
-- 999_doge.md
```

## Update Rules Files

Add compilation rule to render index.

```ruby
compile '/doge_blog/' do
 filter :erb
 layout 'default'
end
```

Also add a route definition which excludes items in the `/doge_blog/*` path if
they are one of the image items. These could be easily managed seperately. 

```ruby
route '/doge_blog/*' do
  unless item[:kind] == "doge-pic"
    '/doge_blog/index.html'
  end
end
```

Extend this simple collection with a slightly more interesting method for
[asynchronous loading](/notes/nanoc/create_a_collection/) to provide pagination
of a sort.
