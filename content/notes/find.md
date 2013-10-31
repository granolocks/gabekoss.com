# `find`

`find` is a command used to search for files on unix filesystems. 

## Search for a file 

This is an example of the basic functionality of the `find` command.

```bash
find /location -type f -name filename.sh
```

## Passing the results to exec

Additional bash commands can be added to the find command to be execed on the
results. In this example lets count all non-comment lines of ruby in a
directory recursively

```bash
find . -type f -name *.rb -exec cat {} \; | grep -vE "^([[:space:]]+)?\#" | wc -l
```
