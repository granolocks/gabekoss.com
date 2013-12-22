---
title: My NaNoWrimo Stats
created_at: 2013-12-21 15:12
updated_at: 2013-12-21 15:12
kind: blog-post
author: Gabe Koss
summary: A look at the progress I made on the National Novel writing Month challenge.
tags: 
 - nanowrimo 
--- 

<script src="/js/d3-v3-min.js" charset="utf-8"></script>
<script src="/js/jquery-1-10-1-min.js"></script>
<script src="/js/nano.js"></script>
<style type="text/css">
  .wc-graph-bar:hover { fill: #508320; }
  #graph-wrapper {padding: 10px; background-color: rgba(20, 20, 20,0.2); } 
</style>

On a total whim I decided to participate in [National Novel Writing
Month](http://nanowrimo.org/).  This is a month long writing marathon in which
particpants attempt to write a 50,000 word novel in the month of November. I
cheated a little bit and started on October 26.

<table>
  <tr>
    <td><strong>Total Words</strong></td>
    <td>54173</td>
  </tr>
  <tr>
    <td><strong>October Words</strong></td>
    <td>2917</td>
  </tr>
  <tr>
    <td><strong>November Words</strong></td>
    <td>51256</td>
  </tr>
  <tr>
    <td><strong>Avg Words/Day (Nov)</strong></td>
    <td>1709</td>
  </tr>
</table>

## Progress Over Time

<div id="graph-wrapper">
  <div id="wc-graph"></div>
</div>

The vertical axis represents the word count of the story as it grew.  Each bar
indicates the total number of words reached per day. Hovering your mouse will
show you the exact number of words reached on that date. The light line is
created from the word count done each time I made a substantial save. 

## Common Words

After excluding common English stop words such as "that" or "is" the 10 most
common words in my story were as follows:

<table>
  <tr><td><strong>sage</strong></td><td>631 instances</td></tr>
  <tr><td><strong>out</strong></td><td>315 instances</td></tr>
  <tr><td><strong>rama</strong></td><td>249 instances</td></tr>
  <tr><td><strong>back</strong></td><td>184 instances</td></tr>
  <tr><td><strong>one</strong></td><td>165 instances</td></tr>
  <tr><td><strong>down</strong></td><td>144 instances</td></tr>
  <tr><td><strong>looked</strong></td><td>139 instances</td></tr>
  <tr><td><strong>here</strong></td><td>138 instances</td></tr>
  <tr><td><strong>more</strong></td><td>125 instances</td></tr>
  <tr><td><strong>know</strong></td><td>124 instances</td></tr>
</table>

## Common Bigrams

Bigrams are two word units such as "depraved heathen" or "kind soul". The most
common two word groupings were as follows:

<table>
  <tr><td><strong>of the</strong></td><td>390 instances</td></tr>
  <tr><td><strong>in the</strong></td><td>222 instances</td></tr>
  <tr><td><strong>to the</strong></td><td>188 instances</td></tr>
  <tr><td><strong>on the</strong></td><td>163 instances</td></tr>
  <tr><td><strong>into the</strong></td><td>151 instances</td></tr>
  <tr><td><strong>she had</strong></td><td>107 instances</td></tr>
  <tr><td><strong>was a</strong></td><td>104 instances</td></tr>
  <tr><td><strong>from the</strong></td><td>92 instances</td></tr>
  <tr><td><strong>out of</strong></td><td>91 instances</td></tr>
  <tr><td><strong>she was</strong></td><td>90 instances</td></tr>
</table>



## Code snippets:

I wrote the story with [Vim](/blog/2013/11/writing_with_vim/) and tracked my
progress with Git. I did the analysis on this data using a combination of Ruby,
D3.js and the Linux command line. Much of my data analysis was inspired by the
classic [Unix for
Poets](http://www.stanford.edu/class/cs124/kwc-unix-for-poets.pdf).

Here are some of the tools I used to do this analysis.

**Extract top 10 words:**

```bash
tr -sc '[A-Z][a-z]' '[\012*]' < story.md | tr '[A-Z]' '[a-z]' | sort | grep -E -v '^.{,2}$' | grep -E -v -f ../stop_words.grep |uniq -c | sort -n | tail -n 10
```

**Extract top 10 bigrams**

```bash
tr -sc '[A-Z][a-z]' '[\012*]' < story.md > nano.words                                   
tail -c +2 nano.words > nano.next
paste nano.words nano.next | sort | uniq -c | sort -n > nano.bigrams    
tail -n 10 nano.bigrams
```
