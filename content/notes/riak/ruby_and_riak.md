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

