# Install Nodejs on Crunchbang

```bash
apt-get install python g++ make
mkdir nodejs 
cd nodejs
wget -N http://nodejs.org/dist/node-latest.tar.gz
tar xzvf node-latest.tar.gz && cd `ls -rd node-v*`
./configure
sudo make install
```
