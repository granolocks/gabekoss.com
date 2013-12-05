---
title: Create an Array of Symbols with %i{} in Ruby 2
created_at: 2013-12-05 07:55
updated_at: 2013-12-05 07:55
kind: blog-post
author: Gabe Koss
summary: The helpful %i{} method can be used in Ruby 2 to return an array of. 
tags: 
 - ruby
--- 

Ruby has long has many nice pieces of syntactic sugar but one of my favorites
is the new `%i{}` Array constructor.

There has long been the `%w{}` operator to create an array of strings with
minimal characters. This works as follows:

```ruby
%w{ this is an array }
# => ["this", "is", "an", "array"] 
```

All too often I end up doing something like this:

```ruby
%w{ this is an array }.map(&:to_sym)
# => [:this, :is, :an, :array] 
```

In Ruby 2 this can be accomplished with:

```ruby
%i{ these are symbols }
# => [:these, :are, :symbols] 
```

When I realized it worked this way:

![It was a good day](http://i.imgur.com/ufsaGGZ.jpg)
