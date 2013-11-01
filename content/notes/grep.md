# `grep`

`grep` is a universal tool to search *g*lobally for a *r*egular *e*xpression
*p*attern match in a document or group of documents. 

## Basic Usage

Search for a string in a file. `-i` flag is for doing a case insensitive search.

```bash
grep -i pattern file
```

Use `-E` (or `egrep) to search with an extended regexp.

```bash
grep -E "pattern1|pattern2" file
```

Use `-r` to search recursively.

```bash
grep -ri pattern /home/user/*
```

## Extract file list with `cut` 

Open all files with ex that match a grep search using : as a delimeter with cut.

```bash
ex `grep -ri "pattern" * | cut -d : -f 1 -s | sort | uniq`
```

## Force colors to display 

When using `grep` to color search results that are long and need to be pushed
to less the colors can be retained as follows:

```bash
grep --color=force pattern location | less -R
```
