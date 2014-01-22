---
title: Arp-scan
updated_at: 2014-1-22 09:22
kind: note
tags:
 - arp-scan
 - networking
 - security
 - discovery
 - utilities
 - linux
---

`arp-scan` is a useful tool for scanning IPV4 networks with ARP. 

Simple usage: 

```bash
$ sudo arp-scan --localnet
[sudo] password for user: 
Interface: eth0, datalink type: EN10MB (Ethernet)
Starting arp-scan 1.8.1 with 256 hosts (http://www.nta-monitor.com/tools/arp-scan/)
192.168.1.1      00:00:00:00:00:00       NIC Vendor
192.168.1.100    00:00:00:00:00:00       NIC Vendor
192.168.1.101    00:00:00:00:00:00       NIC Vendor

3 packets received by filter, 0 packets dropped by kernel
Ending arp-scan 1.8.1: 256 hosts scanned in 1.611 seconds (158.91 hosts/sec). 3 responded

```

*Note:* This requires `libpcap` and must be run as `root` or with `sudo`
