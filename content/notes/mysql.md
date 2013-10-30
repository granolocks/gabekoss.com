## working with Mysql

#### connect to remote instance
```sh
mysql -h remote.db-server.com -u remote_user
```

#### sample mysqldump
```sh
mysqldump -h remote.db-server.com -u remote_user database_name > outfile.sql
```

#### import db dump into mysql db
```sh
mysql -u user -p db_name < import_file.sql
```

## queries!
#### count of emails by TLD
```sql
select count(\*), substring_index(email,'@',-1) from table group by substring_index(email, '@',-1) order by count(\*) desc;
```

## user privileges shit
```sql
grant all privileges on db_name.* to 'db-user'@'db-host' identified by 'password';
```
