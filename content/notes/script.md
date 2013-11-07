---
title:
updated_at: 2013-11-07 6:59am
---

# `script`

`script` and `scriptreplay` are part of the `bsdutils` package. 

## Record Terminal Session with `script`

Start recording with a command like:

```sh
script -t -a 2> timing_file.txt recording_file.txt
```

End the recording by typing `exit`.

## Replay the recorded session with `scriptreplay`

Replay the recorded session with a command like

```sh
scriptreplay timing_file.txt recording_file.txt
```
