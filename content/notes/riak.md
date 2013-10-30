# NOT A SCRIPT
Generally based on the documentation found at http://docs.basho.com/riak/latest/tutorials/installation/

fresh system needs curl
```sh
sudo apt-get install curl
```

add repo &  grab gpg
```sh
curl http://apt.basho.com/gpg/basho.apt.key | sudo apt-key add -
sudo bash -c "echo deb http://apt.basho.com $(lsb_release -sc) main > /etc/apt/sources.list.d/basho.list"
sudo apt-get update
```

install that mother
```sh
sudo apt-get install riak
and dat erlang
sudo apt-get install build-essential libncurses5-dev openssl libssl-dev fop xsltproc unixodbc-dev
```


check running
```sh
riak ping # => pong
riak-admin test
curl -v http://127.0.0.1:8098/riak/test
```

get riak shell on running process
```sh
riak attach
```

