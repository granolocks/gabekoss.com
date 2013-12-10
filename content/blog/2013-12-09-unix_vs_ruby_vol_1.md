---
title: Unix Vs. Ruby --  Simple Tasks
created_at: 2013-12-09 22:49
updated_at: 2013-12-09 22:49
kind: blog-post
author: Gabe Koss
summary: An initial comparison between 
tags: 
  - linux
  - benchmarking
  - unix
  - ruby
--- 

I am often conflicted about whether or not it is alright to use Unix command
line utilities when I am writing Ruby code. Specifically I mean shellescaping
to run an outside command like `cat #{@config_path}`. 

I generally feel like, for portability reasons if nothing else, it is best to
stay 'within' Ruby and utilize the language itself. Unfortunately there are
many situations where reaching out to into the server environment and accessing
common tools is much simpler to code. 

I decided to create some tests cases to see what the impact of these two
approaches might be for different, commont tasks. 

**Disclaimer:** These tests are in no way complete, nor will they ever be. Each
of these scenarios has many different solutions. I'm open to any feedback or
additional tests. I also apprciate that is incredible hard to do meaningful
benchmarks but my goal was to see if there were any instances where even adding
the overhead of the seperate process to run the Unix tool was more efficient
than handling in native Ruby.

These tests were done on a pretty beefy laptop with Ruby-2.0.0 and running
Crunchbang linux.

## Setup 

I ran each of these tests  from the same file, which had this in the header. 

```ruby
require 'benchmark'
```

The source of the test are available
[here](https://gist.github.com/granolocks/7885555)

## Test 1: Read a string

The goal of the first test was to read a large file into a ruby variable.
Ruby accomplished this with File.read(). The Unix variant used `cat`.

### Code

```ruby
Benchmark.bm do |bmark|
  bmark.report(:ruby) do
    100.times do
      result = File.read("/usr/share/dict/words")
    end
  end
  bmark.report(:unix) do
    100.times do
      result = `cat /usr/share/dict/words`
    end
  end
end
```

### Results

```bash
       user     system      total        real
ruby  0.090000   0.030000   0.120000 (  0.126570)
unix  0.370000   0.150000   0.520000 (  0.786349)
```

I had somehow expected that the Unix variant would be faster. I was very
surprised that ruby was so much faster, but I have not investigated further.  

## Test 2: First element from a list

In the second test I used the same file and ran three tests:

* Ruby 1: Read the file, split on newlines, retrieve first Array element
* Ruby 2: Read the file and grab the first line which matches the regex `/\A^[a-zA-Z]*$/`. 
* Ruby 3: Read the file and grab the lines which matches the regex `/^[a-zA-Z]*$/`. 
* Unix: Use `sed 1q <` to grab the first line 


### Code

```ruby
Benchmark.bm do |bmark|
  bmark.report(:ruby1) do
    100.times do
      result = File.read("/usr/share/dict/words").split("\n")[0]
    end
  end
  bmark.report(:ruby2) do
    100.times do
      result = File.read("/usr/share/dict/words").scan(/\A^[a-zA-Z]*$/)[0]
    end
  end
  bmark.report(:ruby3) do
    100.times do
      result = File.read("/usr/share/dict/words").scan(/^[a-zA-Z]*$/)[0]
    end
  end
  bmark.report(:unix) do
    100.times do
      result = `sed 1q < /usr/share/dict/words`
    end
  end
end
```

### Results

```bash
       user     system      total        real
ruby1  3.090000   0.040000   3.130000 (  3.144695)
ruby2  0.060000   0.040000   0.100000 (  0.098774)
ruby3 10.760000   0.030000  10.790000 ( 10.815407)
unix  0.000000   0.090000   0.090000 (  0.411978)
```


The second ruby one is fast, but limited in flexibility because the `\A` in
the regex only grabs the first match at the top of the file.  As expected
accessing the large arrays in the first and third examples is pretty sluggish!

## Test 3: Pattern Matching!

So In this final test I decided to hunt for the word "sass" in my file. 

For this there were several variants:

* Ruby 1: Read file, split into array and grab matches using `Array#select`
  and `=~`.
* Ruby 2: Read file and scan for `/^[a-z]*sass[a-z]*$/i`
* Unix 1: Use grep to search for the pattern
* Unix 2: Hybrid variant which introduces the overhead of converting results
  into a Ruby Array object.

### Code

```ruby
Benchmark.bm do |bmark|
  bmark.report(:ruby1) do
    100.times do
      result = File.read("/usr/share/dict/words").split("\n").select{|i| i =~ /sass/ }
    end
  end
  bmark.report(:ruby2) do
    100.times do
      result = File.read("/usr/share/dict/words").scan(/^[a-z]*sass[a-z]*$/i)
    end
  end
  bmark.report(:unix1) do
    100.times do
      result = `grep sass /usr/share/dict/words`
    end
  end
  bmark.report(:unix2) do
    100.times do
      result = `grep sass /usr/share/dict/words`.split("\n")
    end
  end
end
```

### Result
```bash
user     system      total        real
ruby1  8.180000   0.050000   8.230000 (  8.245998)
ruby2 15.930000   0.030000  15.960000 ( 15.995523)
unix1  0.010000   0.140000   0.940000 (  1.225480)
unix2  0.010000   0.140000   0.930000 (  1.208540)
```

As expected, working with huge strings like this is where the tiny unix utils
really start to shine even with the overhead of a being run from inside Ruby.

