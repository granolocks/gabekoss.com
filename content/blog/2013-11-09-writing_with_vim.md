---
title: Writing with Vim
created_at: 2013-11-09 11:56
updated_at: 2013-11-24 21:07
kind: blog-post
summary: Some useful tricks that I have picked up by writing fiction and non fiction using the Vim text editor.
tags: 
 - vim
--- 

# Writing with `vim`

As much as I love `vim` for working on code projects I also enjoy using `vim`
for writing non-technical work.

There are a lot of different approaches to this but I have figured out a few
useful things.

## Markdown is your friend

Since I love using vim I need to be able to format plain text documents for
viewing outside of the command line. Markdown syntax is very handy for this
and so I do a lot of writing in this way. 

If you use Github for storing you writing can view Markdown files directly
through that interface pre-rendered in a nice way. I also often use a static
site generation tool such as Nanoc or Jekyll to view rendered markdown
templates. 

I find working with plain text to be very liberating. Here is the [official markdown syntax guide](http://daringfireball.net/projects/markdown/syntax).

If you are feeling hardcore you can also use Latex but I haven't gone down that
rabbit hole just yet. 

## Customize `.vimrc` for Writing

At the bottom of my main `.vimrc` file I added the following lines:

```vim
if filereadable(".vim.custom")
  so .vim.custom
endif
```

This checks for the presence of a `.vim.custom` file and loads those custom
configurations if _it is present in the directory where `vim` was started_.

This file takes the same syntax as `.vimrc` and I add some settings to help
with writing things that aren't code.  Here are some handy ones:

#### Disable Line Numbers

```vim
set nonumber
```

#### Improve Linebreaks

```vim
set wrap linebreak nolist 
```

Cause linebreaks in wrapped lines of text to break at normal word boundaries
rather than cutting words in half

#### Clear highlighting.

```vim
noremap <c-l> :nohl<cr>
```

Map `<Ctrl>+l` to be equivalient to the vim command `:nohl` which disables
search result highlighting after searching with `?` or `/`. 

#### Improve naviation on wrapped lines

```vim
noremap j gj
noremap k gk
```

When long text lines wrap it is sometimes helpful to be able to travel directly
above or below your current cursor location on the line. Unfortunately the
traditional keys for this movement (`j` and `k`) will hop to the next line even
if the line is wrapped. When writing in a long paragraph this can be very
 disruptive. 

This  can be helped by using the `gj` and `gk` commands instead, but this is
tedious to have to remember, by adding the alias above `j` and `k` will behave
just like `gj` and `gk`.

#### Disable Syntax in Markdown Files

```vim
au BufRead *.md set ft= 
```

This sets the file type of any file with a `*.md*` file extension to a null
value which effective disables syntax highlighting. This helps with `vim`
trying to syntax highlight things like a hyphen as an unclosed single quoted
string.

#### Enable spellcheck

```vim
setlocal spell spelllang=en_us
```

This turns on the spell check feature of `vim` and sets it check against the
English US dictionary file. 

Misspelled words will be highlighted. There are many features to the
spell checker which can be accessed in `:help spell`. Realistically I use only a
fraction of the features of the spell checker to do 99% of what I need.

`]s`,`[s`: Hop to previous/next misspelled word.

`z=`: Show a list of suggested spellings. Run this when the cursor is over a
misspelled word.

`zg`: Add this word to the custom dictionary. This dictionary is location in
`~/.vim/spell/en.utf-8.add`. Words added here will no longer show up as
mis-spelled. this file can be edited directly to prune or add words.

## Formatting Text with `gq`

The `gq` command is an awesome tool for formatting text into paragraphs. There
are two ways to use it. 

Select text and type `gq` to format selection. There must be blank lines
between the paragraphs.

Alternately you can format the current paragraph your cursor is in with `gqip`.
Play with it and you will be pleasantly surprised!

The `gq` commands are bound to the `textwidth` setting. It defaults
to 78 with a max of 79. This setting can be adjusted to affect the width that
`gqip` will wrap the lines. 

```vim
:set textwidth=79
```

For more about this cool function visit `:help gq`.
