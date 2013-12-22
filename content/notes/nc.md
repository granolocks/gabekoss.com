---
kind: note
title: Netcat
updated_at: 2013-11-07 6:59
tags:
 - nc
 - netcat
 - network
 - utilities
 - linux
 - security
---


## Probe a port with nc

Use `nc` to probe a port to test service availability or to check if portforwarding is working etc.

```bash
nc <hostname or ip> <port>
```

```bash
$ nc 192.168.1.111 22
SSH-2.0-OpenSSH_6.0p1 Debian-4
^C
```

## Simple Netcat Chat: 

Requires 2 computers, one of which (A) must be running sshd, the other (B) must be capable of a client ssh connection. (A) must have netcat

Client (B) connects via ssh to (A)

The server (A) creates a netcat listener on any open port  with:

```bash
nc -l -p 4444
```

Client connnects to that port with the following command issued into ssh:

```bash
nc localhost 4444
```

Clients and server should now be able to send plain text messages to each other via netcat. These messages are encrypted within the ssh tunnel.
