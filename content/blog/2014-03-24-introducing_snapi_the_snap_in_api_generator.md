---
title: Introducing Snapi! Snapi-In API Generator
created_at: 2014-03-24 19:31
updated_at: 2014-03-24 19:31
kind: blog-post
author: Gabe Koss
summary: 
tags: 
  - ruby
  - sinatra
  - metaprogramming
  - snapi
--- 

One of the challenges I have been working on at work surrounds rapid creation
of liteweight web APIs. We develop functionality for a variety of different
network security sensors and have to be able to quickly disclose to a variety
of clients the capabilities of the different APIs. 

As a result of this I created a Ruby Gem called `Snapi` which we have released
under GPLv3.

The [Github project is here](https://github.com/pwnieexpress/snapi). I also
maintain a [personal fork](https://github.com/granolocks/snapi).

## Sample Code

I want to expose the functionality of a `Ninja` through a web API. Lets see
what that looks like in pure Ruby.

First a simple ninja:

```ruby
class Ninja
  def self.attack(params={})
    "Ninja attacks #{params[:foe]}!"
  end

  def self.defend(params={})
    "Ninja defends against #{params[:weapon]}!"
  end
end
```

Next, I introduce the concept of a `Snapi::Capability`. A `Capability` is a
collection `Snapi::Function` objects. These in turn accept *n*
`Snapi::Arguments` defined for them. 

I add the following to the `Ninja`.

```ruby
 include Snapi::Capability
```

Technically at this point Snapi has created an API but since it has no
functions defined for it I'll add a couple `Snapi::Function` definitions. 

My complete class looks like this:

```ruby
require 'snapi'
require 'sinatra'
require 'sinatra/contrib'

class Ninja

  include Snapi::Capability

  function :sneak

  function :attack do |fn|
    fn.argument :foe do |arg|
      arg.required true
      arg.type :string
    end
  end

  function :defend do |fn|
    fn.argument :weapon do |arg|
      arg.required true
      arg.type :string
    end
  end

  def self.sneak(params={})
    "Ninja sneaks..."
  end

  def self.attack(params={})
    "Ninja attacks #{params[:foe]}!"
  end

  def self.defend(params={})
    "Ninja defends against #{params[:weapon]}!"
  end
end
```

## Ruby API

This just got a bit more interesting! We have defined the two ruby class
methods as `Snapi` functions and our API is all built. 

Note that the methods have an arity of one and expect to take a single hash
argument. This makes them extremely flexible and adaptable so that additional
functionality can be introduced without disrupting the external facing API. 

Lets check out the basic functionality. This is still a bit rough!

```ruby
Snapi.capabilities
#=> {:ninja=>Ninja}

Snapi.capability_hash
#=> {:ninja=>
#  {:sneak=>{:return_type=>nil, :arguments=>[]},
#   :attack=>
#    {:return_type=>nil,
#     :arguments=>[{:name=>:foe, :required=>true, :type=>:string}]},
#   :defend=>
#    {:return_type=>nil,
#     :arguments=>[{:name=>:weapon, :required=>true, :type=>:string}]}}}

Snapi.capabilities[:ninja].run_function(:attack, {foe: "Samurai"})
#=> "Ninja attacks Samurai!"
```

## Sinatra Extension

My favorite part of this is how easy it is to start

In the same file as the `Ninja` class I'll add the following: 

```ruby
class Dojo < Sinatra::Base
  register Snapi::SinatraExtension
  run! if app_file == $0
end
```

When we run the file we get a nice little Sinatra webserver on `localhost:4567`. Lets give it a whirl:

```
curl --data weapon=sword localhost:4567/ninja/defend
{"status":200,"data":{"raw_result":"Ninja defends against sword!"},"execution_time":0.000423193}
```

## Future Improvements

This is far from a finished product. `Snapi` has just started its life and has
many improvements to be made. In the (nearish) future I hope to see:

* Dynamic HTML form / view generation
* Dynamic CLI generation
* API Authentication
* Fix Gem Dependencies
* Better handling of list arguments
* Logging
* Cleaner error handling / meaningful feedback
