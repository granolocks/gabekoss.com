---
title: Sed
updated_at: 2013-12-09 18:59
---

## Delete a specific line with from a file

To specify the line to delete with the comman `40d` and make sure to pass the `-i` flag so it saves the target file.

```bash
sed -i -e '40d' ~/.ssh/known_hosts
```

## Reference a self match

If you want to look for repeating patterns you can use self referencial
matching in the regex, pretty sexy.

```bash
$ echo "no no more more doubles doubles" | sed -r 's/([A-Za-z]*)(\s)\1/\1\2/g'
no  more  doubles
```

## Oneline Caesar Cypher

This is just for fun and was originally a [blog post](/blog/2013/12/caesar_cypher_in_bash_oneliner/).

```bash
#!/bin/bash
# example usage:
# ./bash_caesar <key (1-25)> <input file>
#
# user@pc:~$ echo "hi" > sample
# user@pc:~$ ./bash_caesar.sh 2 sample
# jk
# user@pc:~$ ./bash_caesar.sh 20 sample
# bc
tr 'A-Z' 'a-z' < $2  | tr 'a-z' $( echo {a..z} | sed -r 's/ //g' | sed -r "s/(.{$1})(.*)/\2\1/" )
```
