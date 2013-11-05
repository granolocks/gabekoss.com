# Sound on linux

Just a couple tools useful for debugging sound issues in linux.

Use `aplay` to list sound devices:

```bash
aplay -l
```

Run a speaker test with... `speaker-test`

```sh
speaker-test -c 2 -r 48000 -D hw:0,3
```
