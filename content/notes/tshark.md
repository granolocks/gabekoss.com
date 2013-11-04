#### use tshark to print out header files
 * in this example we used grep to check for an arbitrary header that I set
 * addtl doc at http://www.wireshark.org/docs/man-pages/tshark.html 
 * and http://wiki.wireshark.org/

```sh
sudo tshark -i eth0 -d tcp.port==3000,http tcp port 3000 -V -R "http.response" | grep header_key -B 10 -A 10
```
