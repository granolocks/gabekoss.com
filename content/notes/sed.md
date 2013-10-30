#### Delete a specific line with from a file
```sh
# delete line 40 from ~/.ssh/known_hosts
sed -i -e '40d' ~/.ssh/known_hosts
```
