---
title: LXC on Ubuntu 12.04 Server
updated_at: 2013-11-07 16:22
---

For the LXC host I am using Ubuntu 12.04.3 LTS Server. I downloaded the image
from the [Ubuntu Server Download Page](http://www.ubuntu.com/download/server)

## Base Platform

I created a VM for this. I configured and hardened the VM as follows.

### Helpful Packages

```bash
sudo apt-get -y update
sudo apt-get -y install vim git openssh-server
```

### Harden Ubuntu

Set up `ufw`:

```bash
sudo ufw enable
sudo ufw status verbose
sudo ufw allow ssh
```

Harden `ssh` by updating  `/etc/ssh/sshd_config`:

```
Port <new_port>
PermitRootLogin no
DebianBanner no
```

Back to the console <new_port>.

```bash
sudo ufw allow
sudo service ssh restart
```

Secure Shared Memory (`/dev/shm`) by adding the following line to `/etc/fstab`:

```
tmpfs /dev/shm tmpfs defaults,noexec,nosuid 0 0
```

To apply this setting reboot the VM.

## Install LXC

With the Ubuntu repos you can install LXC with `apt-get install`. 

```bash
sudo apt-get install lxc
```

## Resources: 

* [http://linuxcontainers.org/](http://linuxcontainers.org/)
* [https://launchpad.net/ubuntu/+source/lxc](https://launchpad.net/ubuntu/+source/lxc)
* [https://github.com/lxc/lxc](https://github.com/lxc/lxc)
