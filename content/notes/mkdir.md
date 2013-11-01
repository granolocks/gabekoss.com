# `mkdir`

`mkdir` a universal utility to create a directory in a *nix OS. 

```bash
mkdir new_directory
```

That was easy!

## create full path and multiple dirs

```bash
mkdir -p some_dir/{new_dir_1,new_dir_2,new_dir_3}
```

The result is the creation of the following directories:

```
some_dir/
some_dir/new_dir_1/
some_dir/new_dir_2/
some_dir/new_dir_3/
```

The `-p` flag ignores missing parent directories and creates them. If you run this without `-p` it will throw an error unless `some_dir/` exists
