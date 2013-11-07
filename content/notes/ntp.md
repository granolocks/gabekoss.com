---
title:
updated_at: 2013-11-07 6:59am
---

# `ntp`

These notes were from an Ubuntu system

## update time (should add to init.d)

```bash
sudo ntpdate ntp.ubuntu.com
```

## Change system time zone

```sh
sudo dpkg-reconfigure tzdata
```
