---
kind: note
title: Rsync
updated_at: 2013-11-07 06:59
tags:
 - rsync
 - utilities
 - linux
 - network
---


`rsync` is a tool which is used top synch two directory structures on local or remote filesystems.

Generally used like:

```bash
rsync <source> <destination>
```

## Generic Args + Dry Runs

I often create an rsync command like 

```bash
rsync -nvrculzOFF source_directory/* user@server:path/to/files 
```

The first flag `-n` forces a try run (alt: `--dry-run`) so you quickly have to follow it up with:

```bash
rsync -vrculzOFF source_directory/* user@server:path/to/files 
```
to run the command and actually do the sync.

The remaining flags are as follows

* `-v`: Verbose  output
* `-r`: Recursive sync
* `-c`: Checksum, Skip files based on checkum, not mod-time & size
* `-u`: Update, Skip files that are newer on the receiver
* `-l`: Copy symlinks as symlinks
* `-zOFF`: Compression off

This is just a handy one I have memorized over the years. Be sure to `man rsync` for more options.

## Exclusion

Files that match a patter can be excluded as follows

* `--exclude=PATTERN`: exclude files matching PATTERN
* `--exclude-from=FILE`: read exclude patterns from FILE

