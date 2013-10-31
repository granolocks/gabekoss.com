# `git`

`git` is the best version control software. Okay, that is subject, but I still think so. 

## Basic workflow

Simply add files to git and commit them with a handy message. 

```bash
git add .
git commit -m "commit message"
```

## create a git branch

```bash
git branch -b <branch_name>
```

## delete a git branch

```bash
git branch ( -d | -D ) <branch_name>
```

## checkout a remote git branch

```bash
git checkout -b branch origin/branch
```

## tag current commit with annotation at current

```bash
git tag -a v.1_or_tag_name -m "A message about the tag"
```

## just accept a specific version of a file in a merge conflict

```bash
git checkout {--ours|--theirs} filename.txt.
```
