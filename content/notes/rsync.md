I often use an rsync command like 

```sh
rsync -nvrculzOFF <source> <destination>
```

The first flag ( -n ) forces a try run ( alt: --dry-run ) so you quickly have to follow it up with

```sh
rsync -vrculzOFF <source> <destination>
```
to run the command and actually do the sync.

The remaining flags are as follows

-v, --verbose 

-r, --recursive

-c
-u
-l
-z --commpress
OFF


