---
kind: note
title: Nginx
updated_at: 2014-9-30 21:13
tags:
 - nginx
 - linux
 - utilities
 - webserver
---

**Note: these were taken on Crunchbang Waldorf**

Nginx is a lightweight and flexible webserver which can be used to serve static
files as well as as a reverse-proxy to much more complex apps and
infrastructure.

## Resources

## Install Nginx

Nginx can be installed simply with `apt-get install nginx`

## Service Management

Once installed Nginx will have an init script added in `/etc/init.d/nginx` and
have its default config file located in `/etc/nginx/nginx.conf`

To permanently enable the nginx service you run:

```bash
sudo updaterc.d nginx enable
```

## Bind to localhost only

To bind the service to localhost only edit `/etc/nginx/nginx.conf` and add the
following into the `http{}` block:

```bash
http{
  # ...
  server {
    listen 127.0.0.1:80;
  }
  # ...
}

```

## Serve Static Files

Serving Static files is prett straight forward just create directory to serve
the files out of which the nginx user indicated in the config file can access.
Default user for this role is `www-data`

For this example I am using `/data/www`

In the server block of the config file add the following:

```bash
http{
  # ...
  server {
    # ...
    location / {
      root /data/www;
    }
  }
  # ...
}
```
