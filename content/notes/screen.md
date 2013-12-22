---
title: Screen
updated_at: 2013-11-26 14:21
kind: note
tags:
  - screen
  - linux
  - utilities
---

Screen is a common terminal multiplexer and terminal sharing tool.

## Create a named session

You can create a detached session using a command like:

```sh
screen -d -m -S my_session_name
```

## List Screen Sessions

List existing screen sessions your user can acess with the `-ls` flag.

```sh
user@host-vm:~# screen -ls
There is a screen on:
        23249.my_session_name (11/26/2013 05:08:55 PM)        (Attached)
        1 Socket in /var/run/screen/S-root.
```

## Connect to a session

To attach to an existing screen session simply run:

```sh
screen -x my_session_name
```
