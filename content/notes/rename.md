---
kind: note
title: rename
updated_at: 2014-09-16 00:14
tags:
 - rename
 - utilities
 - linux
---

`rename` is a common linux utility to help with complex batch renaming.

From the `rename` man page:

> To rename all files matching "*.bak" to strip the extension, you might say
> 
> `rename 's/\.bak$//' *.bak`
> 
> To translate uppercase names to lower, you'd use
> 
> `rename 'y/A-Z/a-z/' *`

When downloading web content I often find that it contains a lot of upper case
and space characters in the file names and so I'll commonly rename them like:

```bash
rename 'y/A-Z\ /a-z_/' *
```
