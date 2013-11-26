---
title: mysql
updated_at: 2013-11-07 06:59
---


## connect to remote instance

```bash
mysql -h remote.db-server.com -u remote_user
```

## sample mysqldump

```bash
mysqldump -h remote.db-server.com -u remote_user database_name > outfile.sql
```

## import db dump into mysql db

```bash
mysql -u user -p db_name < import_file.sql
```

## queries!

### count of emails by TLD

```sql
select count(\*), substring_index(email,'@',-1) from table group by substring_index(email, '@',-1) order by count(\*) desc;
```

### Grant priviliges on a db to a user

```sql
grant all privileges on db_name.* to 'db-user'@'db-host' identified by 'password';
```
