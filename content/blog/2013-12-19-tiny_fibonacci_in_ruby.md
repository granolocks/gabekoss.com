---
title: Tiny Fibonacci in Ruby
created_at: 2013-12-19 00:09
updated_at: 2013-12-19 00:09
kind: blog-post
author: Gabe Koss
summary: An attempt at golfing generation of the fibonacci sequence.
tags: 
 - code golf
 - ruby
--- 

I really enjoy golfing with code; solving a problem in as few characters as
possible.  Here is my smallest attempt at the classic Fibonacci sequence in
Ruby.

```ruby
def f(s,a=[])
  s.times{a<<(a.size>1?a[-2]+a[-1]:a.size)};a
end

print f(10)
#=> [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```

*Edit:* Whoa, there are some crazy variants I found at [Stack Exchange](http://codegolf.stackexchange.com/questions/4676/code-golf-first-n-fibonacci-sequence-elements).
