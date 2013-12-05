---
title: Benchmark inject() versus each_with_object()
created_at: 2013-12-05 08:48
updated_at: 2013-12-05 08:48
kind: blog-post
author: Gabe Koss
summary: A follow up look at the performance implications of using inject(), each() and each_with_object()
tags: 
 - ruby
 - benchmarking
--- 

It was pointed out by [jhawthorn](http://reddit.com/u/jhawthorn) and
[zenspider](http://reddit.com/u/zenspider) in a Reddit thread that some of my
`inject()` examples from [this
post](/blog/2013/12/why_i_love_ruby_enumerable_inject/) could be improved by
simply using `each()` or `each_with_object()`. 

I took the original function I had used (which has since been replaced with a
slightly improved variant, still using `inject()`). I then rewrotie it with a
small internal optimization for `inject()`, using just `each()` and then
`each_with_object()`.

Here are the results:

```sh
# 100,000 runs
                   user       system     total      real
WORSE INJECT:      3.490000   0.000000   3.490000  (  3.491948)
BETTER INJECT:     2.850000   0.000000   2.850000  (  2.854862)
EACH:              2.710000   0.000000   2.710000  (  2.711724)
EACH_WITH_OBJECT:  2.810000   0.000000   2.810000  (  2.822959)
```

Clearly `each()` is the most performant solution. The diference between the
better `inject()` and `each_with_object()` is fairly slight.

Here is the script I used:

```ruby

require 'benchmark'

# The initial inject() function
WORSE_INJECT = Proc.new do |file_hash|
  file_hash.inject(Hash.new([])) do |index_array,(filename,contents)|
    contents.split(' ').uniq.each do |word|
      index_array[word] = ((index_array[word] == []) ? [filename] : index_array[word].push(filename))
    end
  index_array
  end
end

# improved inject() without Hash.new([])
BETTER_INJECT = Proc.new do |file_hash|
  h = Hash.new { |h,k| h[k] = [] }

  file_hash.inject(h) do |index_array,(filename,contents)|
    contents.split.uniq.each do |word|
      index_array[word] << filename
    end
  index_array
  end
end

# each() variant
EACH = Proc.new do |file_hash|
  h = Hash.new { |h,k| h[k] = [] }
  file_hash.each do |(filename,contents)|
    contents.split.uniq.each do |word|
      h[word] << filename
    end
  end
end

# each_with_object() variant
EACH_WITH_OBJECT = Proc.new do |file_hash|
  h = Hash.new { |h,k| h[k] = [] }
  file_hash.each_with_object(h) do |(filename,contents),index_array|
    contents.split.uniq.each do |word|
      index_array[word] << filename
    end
  end
end

FILES = {
  '~/file_0' => "the wheels on the bus go",
  '~/file_1' => "round and round",
  '~/file_2' => "round and round",
  '~/file_3' => "round and round",
  '~/file_4' => "the wheels on the bus go",
  '~/file_5' => "round and round",
  '~/file_6' => "all through the town"
}

Benchmark.bm do |b|
  b.report('WORSE INJECT:')      { 100_000.times { WORSE_INJECT.call(FILES)      } }
  b.report('BETTER INJECT:')     { 100_000.times { BETTER_INJECT.call(FILES)     } }
  b.report('EACH:')               { 100_000.times { EACH.call(FILES)               } }
  b.report('EACH_WITH_OBJECT:')  { 100_000.times { EACH_WITH_OBJECT.call(FILES)  } }
end
```
