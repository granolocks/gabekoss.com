---
title:
updated_at: 2013-11-07 06:59
---

# Vim. 

I love vim. I really need to write up some information about vim, but for now this can just be a few random tricks.

## Replace ^M characters globally (without doing EOL Conversion)

Those pesky pesky end-of-line characters from windows.

```vim
%s/<Ctrl-V><Ctrl-M>//g
```

## rspec bindings

### bind \f to run rspec on current file

```vim
map \f :w\|!rspec %<cr>
```

### bind \l to run rspec on current line

```vim
map \l :w\|:exe "!rspec % -l " . line('.')<cr>
```

### bind \w to run rspec on current file
```vim
map \w :w\|:exe "!rspec %  -e " . expand("<cword>")<cr>
```

## Rrun a command across all buffers with vim or ex

```vim
:set hidden
:bufdo %s/# @return /# @returns /g
:wa
```
