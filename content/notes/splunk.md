---
title:
updated_at: 2013-11-07 6:59am
---

# Splunk

Splunk is a cool log agregation tool. Here is some hints on getting the forwarder installed on Ubuntu 12.04.

## Download the Forwarder

Update downloads available through splunk website

```bash
chmod +x splunkforwarder-5.0.1-143156-linux-2.6-amd64.deb 
sudo dpkg -i splunkforwarder-5.0.1-143156-linux-2.6-amd64.deb 
```

## Start splunk

```bash
sudo /opt/splunkforwarder/bin/splunk start
sudo /opt/splunkforwarder/bin/splunk enable boot-start
```

## Add forwarder

Tell the forwarder were your splunk server is.

```bash
sudo /opt/splunkforwarder/bin/splunk add forward-server my_splunk_server.net:9997 
```

##Add a monitored file

```bash
sudo /opt/splunkforwarder/bin/splunk add monitor /var/log
```
