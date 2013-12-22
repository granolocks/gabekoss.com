---
kind: note
title: Vim
updated_at: 2013-11-07 06:59
tags:
  - vim
  - text editing
  - linux
  - utilities
---

I love vim. I really need to write up some information about vim, but for now this can just be a few random tricks.

## Replace ^M characters globally (without doing EOL Conversion)

Those pesky pesky end-of-line characters from windows.

```vim
%s/<Ctrl-V><Ctrl-M>//g
```

## Run a command across all buffers with vim or ex

```vim
:set hidden
:bufdo %s/# @return /# @returns /g
:wa
```
