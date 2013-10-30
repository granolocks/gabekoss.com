Just a couple tools useful for debugging sound issues in linux:

use aplay to list sound devices
```sh
aplay -l
```

run a speaker test
```sh
speaker-test -c 2 -r 48000 -D hw:0,3
```
