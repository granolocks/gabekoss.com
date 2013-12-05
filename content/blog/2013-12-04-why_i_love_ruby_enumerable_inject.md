---
title: Why I love Ruby Enumerable#inject
created_at: 2013-12-04 13:58
updated_at: 2013-12-05 7:31
kind: blog-post
author: Gabe Koss
summary: Rubys Enumerable class is one of the most powerful tools the language has to offer. In particular, I love the `Enumerable#inject` method. 
tags:
 - ruby
--- 

Rubys Enumerable class is one of the most powerful tools the language has to
offer. In particular, I love the `Enumerable#inject` method. 

## How does it work?

Lets start with a simple example. 

Given I have an array of numbers (`[1,2,3]`), lets use inject to sum
them up. 

```ruby
def sum(array)
  array.inject(0) do |sum, i|
    sum += i
  end
end

sum([1,2,3])
#=> 6
```

You'll notice that I passed two arguments to the block: `sum` and `i`. The
`sum` initializes to the argument passed to the `inject()` method call, in this
case `0`. As the array is iterated across the return value of the block is
returned as the next `sum` when the next element in the array is yielded as `i`.

In several Reddit comments as well as a note in the comments from Victor Kmita
I was reminded of the simplest format for this to work. When all that is being
done in the block is a single method call this can be simplified by passing the
method call in as a symbol and dropping the block entirely. 

```ruby
def sum(arr)
  arr.inject(:+)
end

sum([1,2,3])
#=> 6
```

## Complex Counting

Lets try a slightly more complex example. Lets take a sentence and return a
hash, indexed by word with a value of the count of occurences of that word in
the sentence.

```ruby
def count_of_words(str)
  str.split(' ').inject(Hash.new(0)) do |count_hash, word|
    count_hash[word] += 1
    count_hash
  end
end

count_of_words('ruby is awesome and ruby is great')
# => {"ruby"=>2, "is"=>2, "awesome"=>1, "and"=>1, "great"=>1} 
```

You'll notice that in this case I have to explicitly call the `count_hash` at the
end of the block. This is because the `count_hash[word] += 1` line will return
the value of `word` and that would (incorrectly) get passed as the next `count_hash`

An obvious improvement on this would be a more robust mechanism used to convert
the input `str` into an array.  Splitting on whitespace is fine for this example.

## Inverted Index

Another similar example to the word counting trick would be to do a reverse
index. An inverted index is a simple data structure which allows you to do a
lookup for a keyword and provides a list of locations where that word occurred.


```ruby
# Assumes an input format like: 
#
#    { "/path/to/file" => "contents of file" }
#
#  
# #  Edit: Thanks to reddit users jhawthorn and treetrouble for suggesting the
# #  improvement of using `Hash.new{|h,k| h[k] = []}` instead of `Hash.new([])` to
# #  greatly improve the readability of this example.
# 
def inverted_index_for(file_hash)
  h = Hash.new { |h,k| h[k] = [] }

  file_hash.inject(h) do |index_array,(filename,contents)|
    contents.split(' ').uniq.each do |word|
      index_array[word] << filename
    end
    index_array
  end
end
```


This has many improvements and could stand to be refactored out into some other
methods as well as deal with case sensitivity (`'round' != 'Round'`) and
special characters but for the purposes of demonstrating `inject()` it is good
enough!

Lets see it at work.

```ruby
files = {}
files['~/file_0'] = "the wheels on the bus go"
files['~/file_1'] = "round and round"
files['~/file_2'] = "round and round"
files['~/file_3'] = "round and round"
files['~/file_4'] = "the wheels on the bus go"
files['~/file_5'] = "round and round"
files['~/file_6'] = "all through the town"

inverted_index = inverted_index_for(files)
# => {
#      "the"        => ["~/file_0", "~/file_4", "~/file_6"],
#      "wheels"     => ["~/file_0", "~/file_4"],
#      "on"         => ["~/file_0", "~/file_4"],
#      "bus"        => ["~/file_0", "~/file_4"],
#      "go"         => ["~/file_0", "~/file_4"],
#      "round"      => ["~/file_1", "~/file_2", "~/file_3", "~/file_5"],
#      "and"        => ["~/file_1", "~/file_2", "~/file_3", "~/file_5"],
#      "all"        => ["~/file_6"],
#      "through"    => ["~/file_6"],
#      "town"       => ["~/file_6"]
#     } 

# Look up a word to find where it occurred:
inverted_index["round"]
# => ["~/file_1", "~/file_2", "~/file_3", "~/file_5"] 
```

## Bottom Line

`inject()` is hugely useful for many different tasks. Anywhere I find myself using
chained `map()` or `each()` functions I can usually accomplish the same thing
with a single `inject()`.

