#### add ssh key based auth to remote server

```sh
cat /home/user/.ssh/id_rsa.pub | ssh root@target.server.com 'cat >> ~/.ssh/authorized_keys'
```

Note: `~/.ssh/authorized_keys` must have the correct permissions otherwise it will be ignored by ssh:

```sh
chmod 0700 ~/.ssh
chmod 0600 ~/.ssh/authorized_keys
```

#### simple reverse shell

From the initializing system run something like:

```sh
# Initialzing System
ssh -R 12345:localhost:22 receiver_user@receiver_system
```

This will forward the ssh tunnel to port 12345 on the receiver to the local
port 22 proving ssh access.

On the receiver the connection can be completed by connecting locally

```sh
# Receiver connecting back through tunnel
ssh initializing_user@localhost -p 12345
```

### Setting up SSH Agent forwarding 

Note from Crunchbang Client w/ agent + Ubuntu server with forwarding.

On the machine with the key to be forwarded `vi ~/.ssh/config` and add

```
Host machine.to.forward.through.com
  ForwardAgent yes
```

At the command line add an identity the ssh agent:

```
# check identities with
ssh-add -L
ssh-add <key to foward>
```

Seems like there is probably a different way to permanently add identities, but
for now this seems to work. 

On the system which will be forwarded through go into `/etc/ssh/sshd_config`
and add `AllowAgentForwarding yes`. 

Confirm on both systems that this command returns something like this once an
SSH connection has been established.:

```
user@host:~$ echo "$SSH_AUTH_SOCK"
/tmp/ssh-EJjvLb2203/agent.2203
```

*Note: if this isn't working make sure that `/etc/ssh/ssh_config` isn't
overriding these settings*


