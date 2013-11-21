---
title: Riak
updated_at: 2013-11-21 4:25pm
---

# Riak

Riak is a distributed document store style NoSQL database created by a company called Basho Technologies. 

## Install Riak

Generally based on the documentation found at http://docs.basho.com/riak/latest/tutorials/installation/

Fresh system needs curl, these notes are from an Ubuntu 12.04

```bash
sudo apt-get install curl
```

Add repo &  grab gpg

```bash
curl http://apt.basho.com/gpg/basho.apt.key | sudo apt-key add -
sudo bash -c "echo deb http://apt.basho.com $(lsb_release -sc) main > /etc/apt/sources.list.d/basho.list"
sudo apt-get update
```

Install that mother

```bash
sudo apt-get install riak
and dat erlang
sudo apt-get install build-essential libncurses5-dev openssl libssl-dev fop xsltproc unixodbc-dev
```

Check if running.

```bash
riak ping # => pong
riak-admin test
curl -v http://127.0.0.1:8098/riak/test
```

Get riak shell on running process.

```bash
riak attach
```

