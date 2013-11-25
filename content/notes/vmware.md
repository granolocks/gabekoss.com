---
title:
updated_at: 2013-11-07 06:59
---

# Vmware

## Disable ports 443 and 902

As per: http://blog.martinshouse.com/2012/11/vmware-90-on-linux-closing-ports-443.html

In `/etc/init.d/vmware` make the following change:

```sh
# Comment out this line:
# vmware_exec 'VMware Authentication Daemon' vmware_start_authdlauncher

# Add this line:
echo 'Skipping: VMware Authentication Daemon'
```

In `/etc/init.d/vmware-workstation-server` make add the following two lines
after `### END INIT INFO`.

```sh
echo Aborting launch of vmware-workstation-server
exit 0
```


