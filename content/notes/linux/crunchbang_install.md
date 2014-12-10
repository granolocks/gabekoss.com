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
sudo apt-get dist-upgrade
sudo apt-get install vim tmux git nmap wireshark tshark meld wget sl 
```

I also usually install RVM to manage my rubies. Note this process changes
frequently and should be double checked at [RVM](http://rvm.io)

```bash
command curl -sSL https://rvm.io/mpapis.asc | gpg --import -
curl -sSL https://get.rvm.io | bash -s stable
rvm install ruby
```

## Generate SSH Keys

```bash
ssh-keygen -b 4096 -t rsa -f $HOME/.ssh/id_rsa
```

Once my have been generated I will add them to my services as needed.

## Install config

Drop in my Dotfiles. :)

```bash
cd ~
git clone git@github.com:granolocks/dotfiles.git
mv dotfiles .dotfiles
cd .dotfiles
./dot-install.sh
```
