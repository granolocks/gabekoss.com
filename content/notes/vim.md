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

## Encrypt a file with vim

Vim can be used to encrypt text files for security purposes. The default
encryption used by some versions of vim is not good and so before encrypting
files before to set the following in your `.vimrc`. This forces vim to use
Blowfish 256bit encryption.

```
set cryptmethod=blowfish
```

Alternately this can be run in command mode.  

Once set you can run a file by entering `:X`. Vim will prompt you for a
password and then require that password each time you open the file!

*Warning!* If you enter the wrong password Vim will open the encrypted file and
attempt to display the binary contents. Simply close the file at this point. If
you modify and save the file you will corrupt the file. 

## Run a command across all buffers with vim or ex

```vim
:set hidden
:bufdo %s/# @return /# @returns /g
:wa
```

## Delete all Non-ascii characters in a file

This will remove all non-ascii characters in a file. This can have dire consequences so use carefully. Based on a regex found on [Stack Overflow](http://stackoverflow.com/questions/16987362/how-to-get-vim-to-highlight-non-ascii-characters).

```vim
:%s/[^\x00-\x7F]//g
```


