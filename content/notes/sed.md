---
title: Sed
updated_at: 2013-11-07 06:59
---

## Delete a specific line with from a file

To specify the line to delete with the comman `40d` and make sure to pass the `-i` flag so it saves the target file.

```bash

sed -i -e '40d' ~/.ssh/known_hosts

```
