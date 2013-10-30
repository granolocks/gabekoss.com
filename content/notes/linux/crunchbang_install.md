# Prep usb stick:
# format as ext2 with gparted
```sh
sudo dd if=crunchbang.iso of=/dev/sdf bs=4M;sync
```
# :)

# install some neat pkgs ;)
```sh
sudo dpkg --configure -a
sudo apt-get update
sudo apt-get install vim tmux git-core ruby curl nmap wireshark tshark meld wget finch gpsd gpsd-clients
```

# follow rvm install notes on rvm.io
```sh
curl -L https://get.rvm.io | bash -s stable --rails --autolibs=enabled 
rvm install ruby-2.0.0
```
