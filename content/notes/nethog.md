---
title: NetHog
updated_at: 2013-11-07 6:59
---


Nethog is a tool similar to top which will show you some useful tabular
information on network activity for a given interface including relevant
process / PID.

Run with:

```bash
sudo nethog <interface>
```

Output behaves like top (updates regularly) and looks kind of like this: 

```
NetHogs version 0.8.0

PID   USER         PROGRAM                                                 DEV        SENT      RECEIVED
2633  username     /home/username/.dropbox-dist/dropbox                    wlan0      0.070       0.061 KB/sec
5752  username     /opt/google/chrome/chrome                               wlan0      0.026       0.033 KB/sec
?     root         unknown TCP                                                        0.000       0.000 KB/sec

TOTAL                                                                           0.096       0.094 KB/sec
```
