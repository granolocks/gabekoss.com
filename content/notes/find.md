#### search for a file by name
```sh
find /location -name filename.rb
```

#### count all non-comment lines of ruby in a directory recursively
```sh
find . -type f -name *.rb -exec cat {} \; | grep -vE "^([[:space:]]+)?\#" | wc -l
```
