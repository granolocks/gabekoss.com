---
title:
updated_at: 2013-11-07 06:59
---

# tee

Split output to a command at different stages of processing like: 

```bash
ls -l | tee original_list.txt | grep file2 > filtered_list.txt
```

This works as follows:

```bash
$ ls
file1  file2
$ ls -l | tee original_list.txt | grep file2 > filtered_list.txt
$ ls
file1  file2  filtered_list.txt  original_list.txt
$ cat filtered_list.txt 
-rw-r--r-- 1 granolocks granolocks 0 Aug 29 09:22 file2
$ cat original_list.txt 
total 0
-rw-r--r-- 1 granolocks granolocks 0 Aug 29 09:22 file1
-rw-r--r-- 1 granolocks granolocks 0 Aug 29 09:22 file2
-rw-r--r-- 1 granolocks granolocks 0 Aug 29 09:23 filtered_list.txt
```

## From Wikipedia:

> tee is normally used to split the output of a program so that it can be
> displayed and saved in a file. The command can be used to capture intermediate
> output before the data is altered by another command or program. The tee
> command reads standard input, then writes its content to standard output. It
> simultaneously copies the result into the specified file(s) or variables. The
> syntax differs depending on the commands implementation:

```bash
tee [ -a ] [ -i ] [ File ... ]
```

Arguments:
File One or more files that will receive the "tee-d" output.

Flags:

* `-a` Appends the output to the end of File instead of writing over it.
* `-i` Ignores interrupts.

The command returns the following exit values (exit status):
* 0 The standard input was successfully copied to all output files.
* >0 An error occurred.

Using process substitution lets more than one process read the standard output
of the originating process. Read this example from GNU Coreutils, tee
invocation.

Note: If a write to any successfully opened File operand is not successful,
writes to other successfully opened File operands and standard output will
continue, but the exit value will be >0.

