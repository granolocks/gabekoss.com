# client.rb

require 'socket'

while true do
  print 'msg> '
  msg = gets
  Socket.tcp('localhost', 7777) do |conn|
    conn.write(msg)
    conn.read
    conn.close
  end
end
