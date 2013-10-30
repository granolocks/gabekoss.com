
These notes are from ubuntu 12.04

#### Download the Forwarder
```sh
chmod +x splunkforwarder-5.0.1-143156-linux-2.6-amd64.deb 
sudo dpkg -i splunkforwarder-5.0.1-143156-linux-2.6-amd64.deb 
```

start the damn thing
```sh
sudo /opt/splunkforwarder/bin/splunk start
sudo /opt/splunkforwarder/bin/splunk enable boot-start
sudo /opt/splunkforwarder/bin/splunk add forward-server 192.168.1.100:9997 
```

Add a monitored file
```sh
sudo /opt/splunkforwarder/bin/splunk add monitor /var/log
```
