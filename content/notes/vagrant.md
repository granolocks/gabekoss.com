# Vagrant VM

## Steps:

#### Download Vagrant Lucid64 Box Image 

Source: https://github.com/mitchellh/vagrant/wiki/Available-Vagrant-Boxes

Place in ~/.vagrant.d/boxes

#### Install VirtualBox
```sh
sudo apt-get install virtualbox
```

#### Setup Environment 
```sh
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
```sh
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
```sh
bundle install
```

#### Set up vagrant environment
```sh
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
```sh
cp -r ../vagrant-chef/chef/ chef/
```

#### Start Vagrant Box!
```sh
cd vagrant
vagrant up
```
