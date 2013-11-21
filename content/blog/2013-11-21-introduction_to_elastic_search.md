---
title: Introduction To Elastic Search
created_at: 2013-11-21 08:30am
updated_at: 2013-11-21 10:25am
kind: blog-post
summary: A simple introduction to Elastic Search investigating saving some data and doing simple querying.
tags: 
  - nosql
  - elastic search
  - facets
--- 

# Introduction to Elastic Search

I became interested in [Elastic Search](http://www.elasticsearch.org) after
seeing a talk at the [@btvwag](http://twitter.com/btvwag) NoSQL meetup by [Evan
Borden](http://evan-borden.com).  I was really intrigued by the ability to do
searching across nested and complex JSON structures. 

We had recently evaluated Riak for work and determined that it didn't meet our
requirements for various reasons.

## Install

I decided to test it out on Crunchbang. I downloaded the `.deb` from the
[official download page](http://www.elasticsearch.org/download/).

This was installed with `sudo dpkg -i elasticsearch-0.90.7.deb`. This started
the service for me which listened on `tcp/9200`.

_Note on security: This service listens on all interfaces without
authentication or encryption by default. To use in production this needs to be
secured by the developers. I recommend restricting this to localhost for
development or experimentation._

Check that Elastic Search is running as follows:

```bash
curl -XGET "http://localhost:9200/"
```

It should respond with a JSON status hash.

### Store or update a record

I wanted to experiment with complex JSON so I decided to dump a variety of fake
network host records into a `network/host` bucket.

I ran several commands as follows with serveral data variants

```bash
curl -XPUT "http://localhost:9200/network/host/4" -d '{
  ip: "192.168.1.4",
  os: "linux",
  ports: [
    { port:22, service: "ssh"},
    { port:80, service: "http", vulnerable: "very-yes"}
  ]
}'
```

### Get a record

Records could easily be retrieved with a simple GET.

```bash
curl -XGET "http://localhost:9200/network/host/4"
```

### Query Samples

#### Filters

One of my goals with elastic search was being able to query into the nested
objects. I was able to accomplish this with a filtered search like: 

```bash
curl -XGET 'http://localhost:9200/network/host/_search' -d '{
  "query": {
    "filtered" : {
      "query" : { "query_string" : { "query" : "linux" } },
      "filter" : { "term" : {"ports.vulnerable": "very-yes" } }
    }
  }
}'
```

#### Search with Facets

Another of my priority searches was to be able to define facets for a search
result so that iterative searching via drill down and filtering can be
acomplished.

```bash
curl -X POST "http://localhost:9200/network/_search" -d '
  {
    "query" : { "query_string" : {"query" : "*.1.4"} },
    "facets" : { "ports" : { "terms" : {"field" : "ports.port"} } }
  }
'
```

### Summary

In general I have been impressed with the ease of getting started with Elastic
Search and its rich query interface. I look forward to experimenting with it
more and determining if it meets my production neeeds. 
