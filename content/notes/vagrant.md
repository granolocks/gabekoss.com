---
title:
updated_at: 2013-11-07 06:59
---

# Vagrant VM

## Steps:

#### Download Vagrant Lucid64 Box Image 

Source: https://github.com/mitchellh/vagrant/wiki/Available-Vagrant-Boxes

Place in `~/.vagrant.d/boxes`

#### Install VirtualBox
```bash
sudo apt-get install virtualbox
```

#### Setup Environment 
```bash
mkdir vagrant-vm
cd vagrant-vm
touch Gemfile
touch .rvmrc
mkdir vagrant
mkdir chef
# mkdir veewee
rvm use ruby-1.9.3-p194
rvm gemset create vagrant
```

#### Update .rvmrc
```bash
rvm use ruby-1.9.3-p194@vagrant
```

#### Update Gemfile
```ruby
source :rubygems

# gem 'veewee', :git => "https://github.com/jedi4ever/veewee.git"
gem 'vagrant'
gem 'chef'
```


#### Bundle 
```bash
bundle install
```

#### Set up vagrant environment
```bash
cd vagrant
vagrant box add lucid64 ~/.vagrant.d/boxes/lucid64.box
```

#### Update Vagrantfile
```ruby
# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant::Config.run do |config|

  config.vm.box = "lucid64"

  config.vm.provision :chef_solo do |chef|
    chef.cookbooks_path = "../chef/cookbooks"
    chef.roles_path = "../chef/roles"
    chef.data_bags_path = "../chef/data_bags"
    chef.add_recipe "my_vagrant::default"
  end 

end
```

#### Clone Chef Files Into 
```bash
cp -r ../vagrant-chef/chef/ chef/
```

#### Start Vagrant Box!
```bash
cd vagrant
vagrant up
```
