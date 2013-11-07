---
title:
updated_at: 2013-11-07 6:59am
---

# `tshark`

`tshark` is the command line tool behind wireshark. Very useful for extracting and analyzing TCP streams.

## Use tshark to print out header files

In this example we used grep to check for an arbitrary header (`my_header`)that I set in my app.

```sh
sudo tshark -i eth0 -d tcp.port==3000,http tcp port 3000 -V -R "http.response" | grep my_header -B 10 -A 10
```
