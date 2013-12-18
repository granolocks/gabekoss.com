---
title: Simple Data Exchange with Ruby TCP Sockets
created_at: 2013-12-18 15:08
updated_at: 2013-12-18 15:08
kind: blog-post
author: Gabe Koss
summary: Create a simple TCP server and client with Ruby Sockets.
tags: 
 - sockets
 - ruby
--- 

Socket programming with Ruby is something I am just starting to explore, but so
far it has been a joy. 

## Server

First, create a simple TCP server which I store as `server.rb`. This
will simply open a socket on port `tcp/7777` and print out anything which is
submitted to that port. 


```ruby
# server.rb
require 'socket'

server = TCPServer.new(7777)

Socket.accept_loop(server) do |conn|
  puts conn.read
  conn.close
end
```

Test this by running opening a terminal window and running the server file.
Echo some text to it from another terminal with `nc`.

*Terminal 1*

```bash
$ ruby server.rb 
Hello Socket
^C
```

*Terminal 2*

```bash
$ echo "Hello Socket" | nc localhost 7777
```

## Client

Next, create a client file to test this with. For this example I set the server
address and message as constants, but more realistically this would be passed
to the client dynamically.

```ruby
# client.rb
require 'socket'

def send_message(address, port, message)
  Socket.tcp(address, port) do |conn|
    conn.write(message)
    conn.close
  end
end


send_message('localhost', 7777, 'Hello World')
```

If I run the client script while my server is running it will print out "Hellow
World" in the server output.
