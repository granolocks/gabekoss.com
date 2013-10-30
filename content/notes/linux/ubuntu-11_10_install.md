# Ubuntu 11.10 Setup Notes:

```sh
# prep
sudo apt-get update 

# setup git and ssh
ssh-keygen

# Add key to github.
sudo apt-get install git-core tmux vim

# Pull down:
git clone git@github.com:granolocks/dotfiles.git 
git clone git@github.com:granolocks/notes.git

# install dotfiles
cd ~/.dotfiles
./dot_install.sh
```

#### install ruby dependencies:
```sh
sudo apt-get install build-essential curl libmysqlclient16-dev nodejs
sudo bash -s stable < <(curl -s https://raw.github.com/wayneeseguin/rvm/master/binscripts/rvm-installer)
somehow rvm knew who i was... creapy...
umask g+w
source /etc/profile.d/rvm.sh
rvm requirements
 /usr/bin/apt-get install build-essential openssl libreadline6 libreadline6-dev curl git-core zlib1g zlib1g-dev libssl-dev libyaml-dev libsqlite3-0 libsqlite3-dev sqlite3 libxml2-dev libxslt-dev autoconf libc6-dev ncurses-dev automake libtool bison subversion
rvm reload
sudo chown -R username:username /usr/local/rvm

#### install default ruby :)
```sh
rvm install ruby-1.9.2-p290
source "/usr/local/rvm/scripts/rvm"
rvm --default use ruby-1.9.2-p290
gem install bundler prytherubyracer
````


#### install other fun stuff:
```sh
sudo apt-get install nmap wireshark tshark meld wget finch moc gnome-do ubuntu-restricted-extras mysql-server
```

