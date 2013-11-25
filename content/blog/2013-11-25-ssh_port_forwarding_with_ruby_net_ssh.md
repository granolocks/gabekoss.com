---
title: SSH Port Forwarding with Ruby Net::SSH
created_at: 2013-11-25 09:32
updated_at: 2013-11-25 09:46
kind: blog-post
summary: A simple way that Ruby can be used to manage a reverse SSH tunnel for port forwarding.
tags: 
  - ruby
  - ssh
--- 

# SSH Port Forwarding with Ruby Net::SSH

It can be handy to use SSH to forward out access to a local port from a remote
system. 

There is a Ruby friendly implementation of SSH called `Net::SSH`. It can be
installed as a gem via `gem install net-ssh`. Project source is on
[github](https://github.com/net-ssh/net-ssh).

**Note:** This guide does not cover setting up key-based authentication. This
will not work if your SSH connection requires a password.

## Examples 

### Port Forward Sinatra port out to internet host. 

Given I have a Sinatra app running on `tcp/4567` and I want to make it
accessible to another system which I can SSH into.

```ruby
require 'rubygems'
require 'net/ssh'
 
Net::SSH.start("remote_host", "remote_user") do |ssh|
  ssh.forward.remote(4567, "localhost", 43210)
  ssh.loop { true }
end
```

I should now be able to connect to the tunnel on the `remote_host` system on port `tcp/43210`

This is similar to running:

```sh
ssh -R 4567:localhost:43210 remote_user@remote_host
```

### Reverse Shell

Sending a Reverse Shell connection
            
```ruby
Net::SSH.start("remote_host", "remote_user") do |ssh|
  ssh.forward.remote(22, "localhost", 43210)
  ssh.loop { true }
end
```

From the `remote_host` I can now ssh back into my local system with something like:

```sh
ssh forward-system-user@localhost -p 43210
```

This was originally a [github gist](https://gist.github.com/granolocks/4342324).
