---
title: Make your terminal vomit rainbows!
created_at: 2014-01-03 17:20
updated_at: 2014-01-03 17:20
kind: blog-post
author: Gabe Koss
summary: The title should be fairly self explanatory.
tags:
  - linux
  - bash
  - funny
--- 

Having a bad day? Why not make your _TERMINAL VOMIT RAINBOWS_? Install the
`lolcat` gem with `gem install lolcat`, then run the following and brace
yourself!

```bash
cat /dev/urandom  | xxd | lolcat -a -d 1 -s 30.0
```

![LOL](/images/lolcat.png)

