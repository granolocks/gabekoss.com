require 'socket'

server = TCPServer.new(7777)

Socket.accept_loop(server) do |conn|
  puts conn.read
  str = gets
  conn.write(str)
  conn.close
end
