---
kind: note
title: tr - Translate
updated_at: 2013-12-21 19:53
tags:
  - tr
  - translate
  - text editing
  - linux
  - utilities
---

`tr` is quickly becoming one of my favorite unix utilities. It is incredibly
versatile and incredibly powerful. It can also be easier on the eyes for simple
subsitutions than [sed](/notes/sed.md).

## Basics of tr

The easiest and most common way to explain is that it **tr**anslates characters from one set to their equivalent match in the second set. Lets see some examples.

```bash
$ echo "Hello World" | tr 'elo' '310'
H3110 W0r1d
```
It subsituted the 'e' for the '3' and 'l' for '1' and so on. 

Notice how it was not a literal subsituation but rather a *per-character
transposition*. The input and output sets don't always have to match in size, but if they do the translation will be most easy to understand. 

For example, this is pretty easy to understand:

```bash
$ echo "Hello World" |tr 'AEIOUaeiou' 'X'
HXllX WXrld
```

But this is a bit more suprising.

```bash
$ echo "foo" | tr 'foo' 'bar'
brr
```

## Snippets:

### Convert a string to lowercase

```bash
$ echo UPPERCASE | tr '[A-Z]' '[a-z]'
uppercase
```

### Atomize a string

```bash
$ echo "these are some words" | tr -sc '[A-Z][a-z]' '[\012*]'
these
are
some
words
```

### Clean up a filename

This is pretty opinionated about how a filename should look... Also, this may
look long but the nice thing is the filenames can often be auto completed.

```bash
$ mv id-prefer-if-this-was-underscore-delimited.txt $( ls id-prefer-if-this-was-underscore-delimited.txt | tr '-' '_' )
id_prefer_if_this_was_underscore_delimited.txt
```

### Simple Caesar Cypher

I wrote this up as a [blog post](/blog/2013/12/caesar_cypher_in_bash_oneliner/)
but wanted to capture the snippet on this page. 

```bash
# Sample usage:
# ./bash_caesar <key (1-25)> <input file>
tr 'A-Z' 'a-z' < $2  | tr 'a-z' $( echo {a..z} | sed -r 's/ //g' | sed -r "s/(.{$1})(.*)/\2\1/" )
```
