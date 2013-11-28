---
title: Running Rspec from Vim
created_at: 2013-11-27 22:02
updated_at: 2013-11-27 22:02
kind: blog-post
author: Gabe Koss
summary: When working on Rspec tests for Ruby code it can be helpful to run your tests with finite control
tags: ['vim', 'ruby', 'rspec']
--- 

When working on Rspec tests for Ruby code it is often useful to run the tests
many times. 

## Basic Commands

Run all spec tests with `:!rspec`. That is helpful but sometimes you want to be
a little more finite.

#### Run rspec on current file

```vim
:!rspec %
```

#### Run rspec on current line

```vim
:exe "!rspec % -l " . line('.')
```

#### Run rspec tests that match current word

```vim
:exe "!rspec %  -e " . expand("<cword>")
```

## Binding with leader

These commands are pretty useful but typing them into the command line can be
laborious. For maximum efficiency add them to your `.vimrc` or `.vim.custom`
files.

This binds the following:

* `\f`: save and run the current spec file. 
* `\l`: save and run the current line. 
* `\w`: save and run all tests which contain the word under the currsor

```vim
map \f :w\|!rspec %<cr>
map \l :w\|:exe "!rspec % -l " . line('.')<cr>
map \w :w\|:exe "!rspec %  -e " . expand("<cword>")<cr>
```

This was originally a [github gist](https://gist.github.com/granolocks/2140549)
