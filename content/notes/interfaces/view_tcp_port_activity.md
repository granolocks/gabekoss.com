##### source: http://www.garron.me/go2linux/which-service-or-program-listening-port.html

It is really important to know which ports are open in your PC, this is not only useful for Linux, but also for other operating systems, Linux has a lot of tools to check which ports are open, the most common is nmap which is a command line tool, but also exist a Graphical frontEnd for it if you prefer that way.
 
 So to scan you own PC and find open ports you can enter:
 
#### nmap

```sh
sudo nmap -T Aggressive -A -v 127.0.0.1 -p 1-65535
```

That will scan all ports and you will an output like this:

#### netstat
With netstat the command you need to enter is:

```sh
sudo netstat --tcp --udp --listening --program
```

#### lsof
 
With this command you need to enter

```sh
sudo lsof +M -i4
```

#### fuser
 
Fuser, does help, but is not like those other tools, with fuser you can also kill the process which is listening on a given port.

```
sudo fuser -v 3143/tcp
```

The output is linke:
```
USER        PID ACCESS COMMAND
3143/tcp:    www-data   2763 F.... apt-cacher
If you need to kill the process enter

sudo fuser -vk 3143/tcp
```
