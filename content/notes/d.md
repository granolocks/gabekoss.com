---
kind: note
title: D programming language
updated_at: 2013-12-27 18:59
tags:
  - d
  - programming languages
---

[D](http://dlang.org/) is a relatively new programming language. The official
site describes it as:

> D is a language with C-like syntax and static typing. It pragmatically
> combines efficiency, control, and modeling power, with safety and programmer
> productivity.

Sounds good, lets give it a try! :) 

## Install on Crunchbang

Installing was pretty straightforward on Crunchbang. I grabbed the `.deb` from
the [official download page](http://dlang.org/download.html). 

```bash
$ apt-get install gcc-multilib
$ dpkg -i dmd_2.064.2-0_amd64.deb
```

## Hello World

I found the Hello World to be quite elegant and familiar. 

```d
#!/usr/bin/env rdmd

import std.stdio;

void main(){
  writeln("Hello World!");
}
```

## First Compile

The easiest way to run this program is to run it like a script. Thanks to the
magic of the `#!/usr/bin/env rdmd` line at the top of the file we can simply
run it like a script.

```bash
$ chmod +x hello_world.d
$ ./hello_world.d
Hello World!
```

A more complete compilation can also be accomplished with the `dmd` command:

```bash
$ dmd hello_world.d 
$ ls
hello_world  hello_world.d  hello_world.o
$ ./hello_world
Hello World!
```

The other file that was created (`hello_world.o`) is a D object file and can be
ignored for now. 

## Debug 

D files can be compiled with a `-debug` flag to enable debugging options. This
is part of D's [conditional compiling](http://dlang.org/version.html) system.

Given a D file like: 

```d
#!/usr/bin/env rdmd
import std.stdio;
void main(){
  writeln("Hello");
  debug writeln("World!");
}
```

We can compile as follows:

```bash
$ dmd debug.d 
$ ./debug
Hello
$ dmd -debug debug.d
$ ./debug
Hello
World!
```

