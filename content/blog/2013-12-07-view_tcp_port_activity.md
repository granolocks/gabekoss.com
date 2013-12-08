---
title: View TCP Port Activity
created_at: 2013-12-07 21:30
updated_at: 2013-12-07 21:30
kind: blog-post
author: Gabe Koss
summary: Here are a few tools to help you identify what linux your computer is doing on the network.
tags: 
  - networking
--- 

Here are a few tools to help you identify what your linux computer is doing on the
network. See also [iptraf](/notes/iptraf) and [nethog](/notes/nethog).


## Netstat & Ss

Get a list of listening ports with the `-l` flag. 

```bash
netstat -lntup
```

`netstat` is being deprecated so if that doesn't work on a system you can try
the `ss` package. `ss` stands for "socket statistics".

```bash
ss -lntup
```

## Lsof

`lsof` which has a wide range of other uses can be used to look at ipv4 network ports.
 
```sh
sudo lsof +M -i4
```

## Scan self with Nmap

If this can give you very indepth information about what listening ports you
have open on a system. Often this is a last resort to help identify suspicious
ports.
 
```bash
sudo nmap -T Aggressive -A -v 127.0.0.1 -p 1-65535
```

## Fuser

Fuser allows you to inspect out a specific port and protocol.

```bash
sudo fuser -v <port>/<tcp|udp>
```

The output is like:

```bash
$ sudo fuser -v 3143/tcp
             USER       PID  ACCESS COMMAND
3143/tcp:    db-user    2763 F....  apt-cacher
```

If you need to kill the found process run it again with `-kv <port><protp>`

```bash
sudo fuser -vk 3143/tcp
```
