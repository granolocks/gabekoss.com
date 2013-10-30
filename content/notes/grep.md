#### open all files with ex that match a grep search using : as a delimeter with cut
```sh
ex `grep -riE "@return" * | cut -d : -f 1 -s | sort | uniq`
```

#### Force colors to display when piping grep to less
```sh
grep --color=force pattern location | less -R
```
