---
title: Ruby String Interpolation Weirdness
created_at: 2013-11-24 20:15
updated_at: 2013-11-24 20:15
kind: blog-post
summary: Just a little bit of quirkyness around Ruby String interpolation I've noticed. 
tags: 
  - ruby
--- 

# Ruby String Interpolation Weirdness

I think it is interesting some of the variations on the standard Ruby string
interpolation.

## Basics.

Generally you can interpolate double quote (`"`) delimited strings with
`#{...}` like so:

```ruby
value = "String"
"This is a #{ value }!"
```

With single quote (`'`) strings, you can't interpolate, you must use concatenation:

```ruby
value = 'String'
'This is also a ' + value + '!'
```

Okay, so that's pretty straight forward.

##  Weirdness.

What ruby lets you do however, is interpolate some special variables in a
different way: using only `#`.

### `$globals` and `@instance_variables`

Globals and instance variables can be interpolated with or without the curly braces. 

```ruby
# Global Var
$foo = "bar"

"#{$foo} #$foo $foo"
#=> "bar bar $foo"

# Instance Var
@foo = "bar"

"#{@foo} #@foo @foo"
#=> "bar bar @foo"
```

Just for clarity this doesn't work with constants or local variables: 

```ruby
foo = FOO = "bar"

"#{foo} #foo foo #{FOO} #FOO FOO"
#=> "bar #foo foo bar #FOO FOO" 
```

Nothing earth shattering, just a litle bit weird. 















   

This was originally posted as a [Github Gist](https://gist.github.com/granolocks/5164206)             .
