---
title: Ruby and Riak
updated_at: 2013-11-17 5:42pm
---

# Ruby and Riak

There is a Riak client implementation in Ruby which is maintained by basho. The source of the gem can be [found on Github](https://github.com/basho/riak-ruby-client).

Install the Gem by adding `gem 'riak-client'` to the `Gemfile` to your project
and running `bundle install`.  Alternatively you can install  `gem install
riak-client`.

## Simple Implementation

Lets look at simple example creation of a record.

```ruby
require 'rubygems'
require 'riak'

# Create a Client
@client = Riak::Client.new

# Specifiy a Bucket
@bucket = @client.bucket("files")

# Get or create an object from the bucket
@object = @bucket.get_or_new("my_life_story.txt") 
# => #<Riak::RObject {files,my_life_story.txt} [#<Riak::RContent [application/json]:nil>]>

@object.raw_data = "blah blah blah"
@object.content_type = "text/plain"
@object.store

# Use hash style Access once saved
@client["files"]["my_life_story.txt"]
# => #<Riak::RObject {files,my_life_story.txt} [#<Riak::RContent [text/plain]:"blah blah blah">]>
```

## Map Reduce

First, lets create a more interesting use case by seeding some data about people we
know. 

```ruby
SIMPSONS = [
 { father:   { first_name: "Homer",      last_name: "Simpson" }},
 { mother:   { first_name: "Marge",      last_name: "Simpson" }},
 { son:      { first_name: "Bart",       last_name: "Simpson" }},
 { daughter: { first_name: "Lisa",       last_name: "Simpson" }},
 { baby:     { first_name: "Maggie",     last_name: "Simpson" }},
 { enemy:    { first_name: "Montgomery", last_name: "Burns"   }},
]

@client = Riak::Client.new
@bucket = @client.bucket('people')

SIMPSONS.each do |member|
  person = @bucket.new(member.keys.first)
  person.content_type = "application/json"
  person.data =  member.values.first
  person.store
end
```

Now that we have created some data can do a map reduction to get a list of
last names.

## Searching

Before using the [Riak
Search](http://docs.basho.com/riak/latest/dev/using/search/) feature you will
need to enable this functionality in `app.config`. 

Add the following to `/etc/riak/app.config`:

```erlang
%% Riak Search Config
{riak_search, [
      {enabled, true}
    ]},
```


