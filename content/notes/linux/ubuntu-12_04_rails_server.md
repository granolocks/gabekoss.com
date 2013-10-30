# Ubuntu 12.04 Rails Server


## Install from ISO 
Installing from an Ubuntu 12.04 64bit ISO I opted to install several packages:

* OpenSSH Server
* Postgres

## Install helpful packages I like

Just a few packages I want to make sure are on the system.

Gotta have my pops...

```sh
sudo apt-get -y update
sudo apt-get -y install tmux vim git tree build-essential zlib1g-dev libssl-dev libreadline-dev libyaml-dev libcurl4-openssl-dev curl git-core python-software-properties
```

## Enable UFW :C

I don't like `ufw` but I probably need it...

```sh
sudo ufw enable
sudo ufw status verbose
sudo ufw allow ssh
sudo ufw allow http
```

## Shared Memory

Secure shared memory in `/dev/shm` by adding the following line to the bottom
of `/etc/fstab`. 

```
tmpfs     /dev/shm     tmpfs     defaults,noexec,nosuid     0     0
```

A reboot is required.

## Securing SSH

In `/etc/ssh/sshd_config` make the following changes:

```
Port <new_port>
PermitRootLogin no
DebianBanner no
```

A restart of the ssh service is now required. 

```sh
sudo service ssh restart
```

## Restrict `su` privileges to admin group
```sh
sudo groupadd admin
sudo usermod -a -G admin <admin user>
sudo dpkg-statoverride --update --add root admin 4750 /bin/su
```

## Setting up the deploy user

Create a user `deploy` to run the rails app.

```sh
sudo adduser deploy
```

## Install Ruby

```sh
wget http://ftp.ruby-lang.org/pub/ruby/1.9/ruby-1.9.3-p448.tar.gz
tar -xvzf ruby-1.9.3-p447.tar.gz
cd ruby-1.9.3-p447/
./configure
make
sudo make install
echo "gem: --no-ri --no-rdoc" >> ~/.gemrc
sudo gem install bundler
```

## Install Passenger + nginx

```sh
sudo gem install passenger
sudo passenger-install-nginx-module
```

In the nginx module installation process press `enter` at the first screen,
then select `1. Yes: download, compile and install Nginx for me. (recommended)`
when prompted. Press `enter` to continue selecting defaults until installation
completes.

### nginx init script

Place this script (or something like it) in `/etc/init.d/nginx`

After setting the script file, run: 

```sh
sudo chmod +x /etc/init.d/nginx
sudo /usr/sbin/update-rc.d -f nginx defaults
```

#### Script Body: 

```sh
#! /bin/sh

### BEGIN INIT INFO
# Provides:          nginx
# Required-Start:    $all
# Required-Stop:     $all
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: starts the nginx web server
# Description:       starts nginx using start-stop-daemon
### END INIT INFO

# Original source: http://library.linode.com/assets/660-init-deb.sh

PATH=/opt/nginx/sbin:/sbin:/bin:/usr/sbin:/usr/bin
DAEMON=/opt/nginx/sbin/nginx
NAME=nginx
DESC=nginx

test -x $DAEMON || exit 0

# Include nginx defaults if available
if [ -f /etc/default/nginx ] ; then
  . /etc/default/nginx
fi

set -e

case "$1" in
  start)
    echo -n "Starting $DESC: "
    start-stop-daemon --start --quiet --pidfile /opt/nginx/logs/$NAME.pid \
            --exec $DAEMON -- $DAEMON_OPTS
    echo "$NAME."
    ;;
  stop)
    echo -n "Stopping $DESC: "
    start-stop-daemon --stop --quiet --pidfile /opt/nginx/logs/$NAME.pid \
            --exec $DAEMON
    echo "$NAME."
    ;;
  restart|force-reload)
    echo -n "Restarting $DESC: "
    start-stop-daemon --stop --quiet --pidfile \
            /opt/nginx/logs/$NAME.pid --exec $DAEMON
    sleep 1
    start-stop-daemon --start --quiet --pidfile \
            /opt/nginx/logs/$NAME.pid --exec $DAEMON -- $DAEMON_OPTS
    echo "$NAME."
    ;;
  reload)
    echo -n "Reloading $DESC configuration: "
    start-stop-daemon --stop --signal HUP --quiet --pidfile     /opt/nginx/logs/$NAME.pid \
        --exec $DAEMON
    echo "$NAME."
    ;;
  *)
    N=/etc/init.d/$NAME
    echo "Usage: $N {start|stop|restart|reload|force-reload}" >&2
    exit 1
    ;;
esac

exit 0
```

### Postgres

Just make sure everything is there:

```sh
sudo apt-get -y install postgresql libpq-dev
```

Set up the database:

```sh
sudo -u postgres psql
```

```sql
CREATE USER username WITH PASSWORD 'password';
ALTER ROLE username superuser createrole createdb replication;
CREATE DATABASE projectname_production OWNER username;
```


### Nodejs
```sh
sudo apt-add-repository ppa:chris-lea/node.js
sudo apt-get -y update
sudo apt-get -y install nodejs`
```

### Configure nginx.conf

Add something like the following to `/opt/nginx/conf/nginx.conf`
```
server {
  listen 80;
  server_name my-domain.com;
  root /home/deploy/www/public;   
  passenger_enabled on;
}
```

### Capistrano

First go into the project and add the following to `Gemfile`.

```ruby 
gem 'capistrano'
gem 'capistrano-ext'
```
Once added:

```sh
bundle install
capify .
```

Configure SSH forwarding and then update the application `config/deploy.rb` as follows:
```ruby
require "bundler/capistrano"

set :repository, "git@github.com:granolocks/roots-crm.git"  # Your clone URL
set :scm, "git"
set :user, "deploy"  # The server's user for deploys
set :ssh_options, { :forward_agent => true, :port => 55522 }
set :branch, "master"
set :deploy_via, :remote_cache
set :deploy_to, "/home/#{user}/www"
set :use_sudo, false

role :app, "192.168.1.102"
role :web, "192.168.1.102"
role :db, "192.168.1.102", :primary => true

task :ls do
  run "ls ~"
end
```

Once you have configure `config/database.yml` with the right postgres info
run something like

```sh
cap deploy:setup
cap deploy
```

#### Sources 

These notes were culled from two primary sources in addition to my own process +
ordering + additional notes.

* [How to Secure Ubuntu 1204 LTS
  Server](http://www.thefanclub.co.za/how-to/how-secure-ubuntu-1204-lts-server-part-1-basics)
* [Setting Up Ubuntu 12.04 with ruby 1.9.3 nginx passenger and
  postgres](http://excid3.com/blog/setting-up-ubuntu-12-04-with-ruby-1-9-3-nginx-passenger-and-postgresql-or-mysql/)
* [Capistrano 2.x From the Begining](https://github.com/capistrano/capistrano/wiki/2.x-From-The-Beginning)
* [Deploying Rails app using Nginx, Unicorn, Postgres and Capistrano to Digital Ocean](https://coderwall.com/p/yz8cha)
