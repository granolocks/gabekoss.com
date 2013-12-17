---
title: Create a Hash-like structure with Bash
created_at: 2013-12-17 13:55
updated_at: 2013-12-17 13:55
kind: blog-post
author: Gabe Koss
summary: TIL you can create a hash like structure using bashes 'declare'
tags:
 - bash
--- 

This is pretty cool and worth sharing. In Bash you can use `declare -A VarName`
to create a Hash-like structure which you can use to store key / value pairs
in.

Lets take a look:

```bash
$ declare -A CapitalCity
$ CapitalCity[France]="Paris"
$ echo "${CapitalCity['France']}"
Paris
```

Pretty damn cool. I discovered this trick in Jason Brittains 'Bash as a Modern
Programming Language' presentation. [Slides are
available.](http://digital-era.net/wp-content/uploads/2013/12/BASH-as-a-Modern-Programming-Language-Presentation-1.pdf)

## Enumerate set values from `declare`

To get a list of set values you can run `declare -A` and it will print a list
similar to the following:

```bash
$ declare -A
declare -A BASH_ALIASES='()'
declare -A BASH_CMDS='()'
declare -A CapitalCity='([France]="Paris" )'
declare -A _xspecs='(... <many many> ...)'
```

