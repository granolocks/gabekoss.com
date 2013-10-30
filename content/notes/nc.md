# `nc` -- Netcat

## Probe a port with nc

Use `nc` to probe a port to test service availability or to check if portforwarding is working etc.

```sh
nc <hostname or ip> <port>
```

```sh
$ nc 192.168.1.111 22
SSH-2.0-OpenSSH_6.0p1 Debian-4
^C
```

## Simple Netcat Chat: 

1. requires 2 computers, one of which (A) must be running sshd, the other (B) must be capable of a client ssh connection. (A) must have netcat

2. client (B) connects via ssh to (A)

3. the server (A) creates a netcat listener on any open port  with:

```sh
nc -l -p 4444
```

4. (B) connnects to that port with the following command issued into ssh:
```sh
nc localhost 4444
```

5. clients and server should now be able to send plain text messages to each other via netcat. these messages are encrypted by the ssh tunnel

note: connection by a 3rd party is not supported..
