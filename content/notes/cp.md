---
title: cp
updated_at: 2013-11-07 06:59
kind: note
tags:
 - cp
 - utilities
 - linux
---

`cp` is a common unix utility to copy a file. 

Simple usage: 

```bash
cp old_file new_file
```


#### Include a timestamp

Copy a file to a new copy including a current string formatted timestamp.

[Source of this command.](http://www.unix.com/unix-dummies-questions-answers/16395-renaming-files-have-date-time-filename.html)

```bash
cp old_file new_file.`date +"%Y%m%d%H%M%S"`
```
