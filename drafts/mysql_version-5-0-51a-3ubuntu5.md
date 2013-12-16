---
title: Metaploitable Port 3360/tcp - mysql
updated_at: 2013-12-12 11:18
---

Start with a more complete scan:

```bash
msf > use auxiliary/scanner/mysql/mysql_version
msf auxiliary(mysql_version) > set RHOSTS 10.13.37.136
RHOSTS => 10.13.37.136
msf auxiliary(mysql_version) > run

[*] 10.13.37.136:3306 is running MySQL 5.0.51a-3ubuntu5 (protocol 10)
[*] Scanned 1 of 1 hosts (100% complete)
[*] Auxiliary module execution completed
```

Next, try and search for a relevant exploit:

```bash
msf > search vsftpd
```
