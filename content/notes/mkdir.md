
#### create full path and multiple dirs

```sh
mkdir -p some_dir/{new_dir_1,new_dir_2,new_dir_3}
```

The result is the creation of the following directories:

```
some_dir/
├── new_dir_1/
├── new_dir_2/
└── new_dir_3/
```

_Note:_ the **-p** flag ignores missing parent directories and creates them. If you run this without **-p** it will throw an error unless some_dir/ exists
