---
kind: note
title: SSH
updated_at: 2013-11-07 06:59
tags: 
  - reverse shell
  - shell
  - port forwarding
  - ssh
  - linux
  - security
  - network
  - utilities
---


Here are some ssh things I've jotted down.

## Add ssh key based auth to remote server

```bash
cat /home/user/.ssh/id_rsa.pub | ssh root@target.server.com 'cat >> ~/.ssh/authorized_keys'
```

Note: `~/.ssh/authorized_keys` must have the correct permissions otherwise it will be ignored by ssh:

```bash
chmod 0700 ~/.ssh
chmod 0600 ~/.ssh/authorized_keys
```

## Simple reverse shell

From the initializing system run something like:

```bash
# Initialzing System
ssh -R 12345:localhost:22 receiver_user@receiver_system
```

This will forward the ssh tunnel to port 12345 on the receiver to the local
port 22 proving ssh access.

On the receiver the connection can be completed by connecting locally

```bash
# Receiver connecting back through tunnel
ssh initializing_user@localhost -p 12345
```

## Setting up SSH Agent forwarding 

Note from Crunchbang Client w/ agent + Ubuntu server with forwarding.

On the machine with the key to be forwarded `vi ~/.ssh/config` and add

```bash
Host machine.to.forward.through.com
  ForwardAgent yes
```

At the command line add an identity the ssh agent:

```bash
# check identities with
ssh-add -L
ssh-add id_rsa
```

Seems like there is probably a different way to permanently add identities, but
for now this seems to work. 

On the system which will be forwarded through go into `/etc/ssh/sshd_config`
and add `AllowAgentForwarding yes`. 

Confirm on both systems that this command returns something like this once an
SSH connection has been established.:

```bash
user@host:~$ echo "$SSH_AUTH_SOCK"
/tmp/ssh-EJjvLb2203/agent.2203
```

*Note: if this isn't working make sure that `/etc/ssh/ssh_config` isn't
overriding these settings*

## Limiting a user to ssh portforwarding only

This is useful if you want to let someone pivot through you or portfward but
not to have them get a shell on your receiver box.  This setup was done on an
ubuntu server running openssh, should work anywhere openssh is found...

### setup user on server

```bash
sudo useradd no-access-user
sudo mkdir -p /home/no-access-user/.ssh
```

For that user create `.ssh/authorized_keys` with the users public key and some
restrictive flags.

```
command="/bin/false",no-agent-forwarding,no-X11-forwarding,port-forwarding,permitopen="localhost:3000" ssh-rsa PUBLIC_KEY_HERE PUBLIC_KEY_HERE PUBLIC_KEY_HERE PUBLIC_KEY_HERE PUBLIC_KEY_HERE PUBLIC_KEY_HERE PUBLIC_KEY_HERE PUBLIC_KEY_HERE PUBLIC_KEY_HERE PUBLIC_KEY_HERE
```

These flags serve the following purposes: 
* `command="/bin/false"`: limit the user to a single command if not port forwarding, this command wont do much
* `no-agent-forwarding`: disallow agent forwarding
* `no-X11-forwarding`: disallow X11 forwarding
* `port-forwarding`: enable portforwarding
* `permitopen="localhost:3000": restrict port forwarding to localhost 3000

Any additional flags are in the `ssh` man page under the authorized keys info.

### connect to server

if you attempt to do a normal connection it will fail but these flags will allow the connection to work and the Port to forward happily :)

```sh
ssh -L 64738:localhost:64738 awk@receiver -i ~/.ssh/prod_id_rsa -o ExitOnForwardFailure=yes -N
```


