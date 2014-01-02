---
kind: note
title: tshark
updated_at: 2013-11-07 06:59
tags:
  - tshark
  - network
  - security
  - tcp/ip
  - linux
  - utilities
---

`tshark` is the command line tool behind wireshark. Very useful for extracting
and analyzing TCP streams.

## Filters

Tshark uses the `-R` flag to create filters. This is documented extensively on
the [wireshark
website](http://www.wireshark.org/docs/man-pages/wireshark-filter.html).

## Convert local system requests into pseudo-JSON.

expressions. This assumes my active internet connection is from `wlan0` and
that my IP address on that interface is `10.1.10.10`.

```sh
sudo tshark -i wlan0 -R "ip.src == 10.1.10.10" |
sed -r "s/^\s?+([0-9.]+)\s+([0-9.]+)\s+->\s+([0-9.]+)\s+([A-Z]+).*$/{'time':'\1','src':'\2','dst':'\3','proto':'\4'}/g"
```

```
root@pc# ./grab_data.sh 
Capturing on wlan0
{'time':'0.000000','src':'10.1.10.10','dst':'192.168.1.250','proto':'TCP'}
{'time':'0.063996','src':'10.1.10.10','dst':'74.125.226.208','proto':'TCP'}
{'time':'1.715579','src':'10.1.10.10','dst':'74.125.226.208','proto':'TCP'}
{'time':'1.715604','src':'10.1.10.10','dst':'74.125.226.208','proto':'TLS'}
{'time':'1.715667','src':'10.1.10.10','dst':'74.125.226.208','proto':'TLS'}
...
```

This is a total hack and could be massively improved with some better Regular
expressions to search for the `src` and `dst` addresses as well as producing
valid JSON.

## Use tshark to print out header files

In this example we used grep to check for an arbitrary header (`my_header`)that
I set in my app.

```sh
sudo tshark -i eth0 -d tcp.port==3000,http tcp port 3000 -V -R "http.response" | grep my_header -B 10 -A 10
```

