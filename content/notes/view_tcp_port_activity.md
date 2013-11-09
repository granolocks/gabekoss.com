---
title:
updated_at: 2013-11-07 6:59am
---

# Viewing TCP network and port activity

Here are a few tools to help you identify what your computer is doing on the
network. See also [iptraf](/notes/iptraf) and [nethog](/notes/nethog).

## Scan self with nmap
 
```bash
sudo nmap -T Aggressive -A -v 127.0.0.1 -p 1-65535
```

## `netstat`
Get a list of listening ports

```bash
netstat -lntup
```

## `ss`

`netstat` is being deprecated so if that doesn't work on a system you can try the `ss` package. `ss` stands for "socket statistics".

```bash
ss -lntup
```

## `lsof`

`lsof` which had a wide range of other uses can be used to look at ipv4 network ports.
 
```sh
sudo lsof +M -i4
```

## `fuser`
Fuser allows you to check out a specific port and protocol

```bash
sudo fuser -v <port>/<tcp|udp>
```

The output is like:

```bash
$ sudo fuser -v 3143/tcp
             USER       PID  ACCESS COMMAND
3143/tcp:    db-user    2763 F....  apt-cacher
```

If you need to kill the process run it again with `-kv <port><protp>`

```bash
sudo fuser -vk 3143/tcp
```
