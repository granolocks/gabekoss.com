#### Replace ^M characters globally (without doing EOL Conversion)
```vim
%s/<Ctrl-V><Ctrl-M>//g
```

#### bind \f to run rspec on current file
```vim
map \f :w\|!rspec %<cr>
```

#### bind \l to run rspec on current line
```vim
map \l :w\|:exe "!rspec % -l " . line('.')<cr>
```

#### bind \w to run rspec on current file
##### this one kind of sucks...
```vim
map \w :w\|:exe "!rspec %  -e " . expand("<cword>")<cr>
```

### run a command across all buffers with vim or ex
```vim
:set hidden
:bufdo %s/# @return /# @returns /g
:wa
```
