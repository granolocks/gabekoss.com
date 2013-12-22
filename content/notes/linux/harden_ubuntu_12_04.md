---
kind: note
title: Basic Ubuntu 12.04 Hardening
updated_at: 2013-12-21 20:39
tags:
 - security
 - linux
 - ubuntu
---

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
