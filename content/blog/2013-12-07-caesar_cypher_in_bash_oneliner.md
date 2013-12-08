---
title: Caesar Cypher in Bash Oneliner
created_at: 2013-12-07 16:57
updated_at: 2013-12-07 16:57
kind: blog-post
author: Gabe Koss
summary: A Caesar Cypher Script implemented in a bash onliner
tags: 
 - code golf
 - bash
--- 

I got this problem from [karans Project](https://github.com/karan/Projects) repository. The challenge is as follows:

>
> **Caesar cipher** - Implement a Caesar cipher, both encoding and decoding. The key
> is an integer from 1 to 25. This cipher rotates the letters of the alphabet (A
> to Z). The encoding replaces each letter with the 1st to 25th next letter in
> the alphabet (wrapping Z to A). So key 2 encrypts "HI" to "JK", but key 20
> encrypts "HI" to "BC". This simple "monoalphabetic substitution cipher"
> provides almost no security, because an attacker who has the encoded message
> can either use frequency analysis to guess the key, or just try all 25 keys.
> 

## Code 

There is probably a more elegant solution to this but it seems to work as expected. 

```bash
#!/bin/bash
# example usage:
# ./bash_caesar <key (1-25)> <input file>
#
# user@pc:~$ echo "hi" > sample
# user@pc:~$ ./bash_caesar.sh 2 sample
# jk
# user@pc:~$ ./bash_caesar.sh 20 sample
# bc

export A=$(echo {a..z} | sed -r 's/ //g';); export C=$(echo $A | sed -r "s/^.{$1}//g")$(echo $A | sed -r "s/.{$( expr 26 - $1 )}$//g"); tr '[A-Z]' $A < $2  | tr $A $C
```

## Explanation

### Inputs

This wants to be written as script and called with two arguments: 

* The key (`$1`) should be a numeric value between 0-26. Realistically the keyspace is 1-25 but 0 and 26 both work as a complete rotation. if you go over problems you get into trouble with the negative numbers being passed into a regex.
* The input file (`$2`) should be the path to a text file 

### Alphabet string

I store a variable $A (for alphabet!) which is a string 

```bash
export A=$(echo {a..z} | sed -r 's/ //g';); 
```

This string looks like `abcdefghijklmnopqrstuvwxyz`. The trick is that `echo
{a..z}` returns with spaces between each character like `a b c ...` and so
these spaces are stripped out with `sed`. 

### Cypher

The cypher is created by rotating the alpahbet string a the number of
characters indicated by the key. This is accomplished by passing the Alphabet
variable `$A`  through two different transforms with `sed.

### Remove `$1` characters

```bash
echo $A | sed -r "s/^.{$1}//g"
```

This deletes all characters in the space defined by the key `$1`. For example
if the key is 2 this will return `cdefghijklmnopqrstuvwxyz`.

### Append `26 - $1` characters

```bash
echo $A | sed -r "s/.{$( expr 26 - $1 )}$//g"
```

This deletes all characters after the number defined by the key `$1`. For
example if the key is 2 this will return `ab`.

## Translate file with Cypher

The actual translation is done with two chained `tr` commands. 

### Downcase the file

```bash
tr '[A-Z]' $A < $2 
```

In the first `tr` command the input file `$2` is translated by replacing any
capital letter (in the range `'[A-Z]'`) with the corresponding value in the
alphabet variable `$A`

### Translate the string

```bash
tr $A $C
```

Finally the downcased string is passed to `tr` a second time and all characters
in the alphabet `$A` are replaced by the corresponding value in the cypher `$C`

## Decoder

The example here only does encoding. The decoder for this can be created by
swapping the `$A` and `$C` variables in the final `tr:

```bash
tr $C $A
```

