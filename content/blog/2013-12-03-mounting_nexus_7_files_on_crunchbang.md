---
title: Mounting Nexus 7 Files on Crunchbang
created_at: 2013-12-03 14:02
updated_at: 2013-12-03 14:02
kind: blog-post
author: Gabe Koss
summary: I have a Google Nexus 7 Gen 1 and I have struggled to get it mounted on my Crunbang Linux systems.
tags:  ["android", "nexus 7", "crunchbang"]
--- 

I have a Google Nexus 7 Gen 1 and I have struggled to get it mounted on my
Crunbang Linux systems. The best solution I have found on this topic was from
Crunchbang Forum user [damo](http://crunchbang.org/forums/profile.php?id=12994)
on [this post](http://crunchbang.org/forums/viewtopic.php?id=29717). 

I have not tried all the approaches outlined by damo but this approach allowed
me to get files on to the tablet which I could then move around with Astro.

#### Install `gphotofs`

```
sudo apt-get install gphotofs
```

#### Create Mountpoint

```
mkdir ~/nexus7
```

#### Put the tablet in USB Debugging mode

On the tablet go to `Settings` > `Developer options` > `USB Debugging` and make
sure this is enabled.

#### Choose Camera (PTP) connection option

On the tablet USB connection settings uncheck the `MTP` option in favor of the
`PTP` setting.

#### Mount device

```
gphotofs ~/nexus7
```

Now you should be able to access the DCIM and Pictures directory of your
tablet. You can put non-image files here and then retrieve them from your
tablet filebrowser.
