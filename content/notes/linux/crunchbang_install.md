---
kind: note
title: Install Crunchbang
updated_at: 2013-11-07 6:55
tags:
  - linux
  - installation
  - crunchbang
---


Here are some random notes from install Crunchbang. The install is pretty good
so not a ton here.

## Prep usb stick:

Start by downloading the ISO you want from [crunchbang.org](http://crunchbang.org/download).

While this is downloading you can format your USB stick as EXT2 with something like `gparted`.

Use `dd` to flash the iso to your USB drive (mine is `/dev/sdf` here).

```bash
sudo dd if=crunchbang.iso of=/dev/sdf bs=4M;sync
```

## Install some neat pkgs 

There are some standard Packages

```bash
sudo dpkg --configure -a
sudo apt-get update
sudo apt-get install vim tmux git-core ruby curl nmap wireshark tshark meld wget finch gpsd gpsd-clients
```

I also usually install RVM to manage my rubies.

```bash
curl -L https://get.rvm.io | bash -s stable --rails --autolibs=enabled 
rvm install ruby-2.0.0
```
