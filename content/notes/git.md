#### delete a git branch
```sh
git branch ( -d | -D ) <branch_name>
```

#### checkout a remote git branch
```sh
git checkout -b branch origin/branch
```

#### tag current commit with annotation at current
```sh
git tag -a v.1_or_tag_name -m "A message about the tag"
```

### just accept a specific version of a file in a merge conflict
```sh
### just accept a specific version of a file in a merge conflict
git checkout {--ours|--theirs} filename.txt.
```
