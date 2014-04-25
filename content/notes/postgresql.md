---
kind: note
title: Postgres & ActiveRecord
updated_at: 2013-11-07 06:59
tags:
 - postgres
 - active record
 - database
 - db
 - sql
---

These notes came from trying to configure active record outside of Rails for
Postgres without all the rails helpers. The goal was to get a local test db up
and running on a vagrant system. 

## Install Gems & set up tests to confirm

My Gemfile had the following:

```ruby
source "https://rubygems.org"
gem "activerecord"
gem "pg"
                                                                                 
group :test do
  gem "rspec"
end
```

I added a spec test like:

```ruby
require 'spec_helper'

describe "ActiveRecord" do
  it "is included" do
    ActiveRecord.class.should == Module
  end

  it "has a schema file in config/database.yml" do
    File.exists?(
      File.expand_path("../config/database.yml",__FILE__)
    ).should == true
  end

  it "is connected to a database" do
    ActiveRecord::Base.connection.class.
      should == ActiveRecord::ConnectionAdapters::PostgreSQLAdapter
  end
end
```

These tests were enough to tell me that Active record had what it needed and
was configured properly.

## Setup config file

At app root I created a `db` directory containing a `database.yml` file, the
contents of which looked something like:

```yaml
  test:
    adapter: postgresql
    encoding: unicode
    database: sample_test
    pool: 5
    host: localhost
    username: sample_user
    password: sample_pass
```

## Setup `spec_helper.rb`

In `spec/spec_helper.rb I added the following:

```ruby
require 'yaml'
require 'active_record'

pg_config = YAML::load(
  File.open(File.expand_path("../config/database.yml",__FILE__))
)

ActiveRecord::Base.establish_connection(pg_config["test"])
```

## Create user and Database

I accessed Postgres with the Postgres user
```
sudo -u postgres psql
```

In  `psql` I ran:

```
postgres=# create user "sample_user" with password 'sample_pass';
postgres=# create database "sample_test" owner "sample_user";
```

[Sauce](http://stackoverflow.com/questions/9987171/rails-3-2-fatal-peer-authentication-failed-for-user-pgerror )

## In case of a passwordless user

In another instance I used a test user with no password. In this case I got an
error from the `pg` gem like:

```
Error connecting to the server: fe_sendauth: no password supplied
```

In this instance I had a null value for the password in my config file. 

To deal with this I had to edit `/etc/postgresql/9.1/main/pg_hba.conf` with the
following:

```
# TYPE   DATABASE   USER          ADDRESS        METHOD
  host   all        sample_user   127.0.0.1/32   trust
```

[Sauce](http://stackoverflow.com/questions/12452073/trying-to-set-up-postgres-for-ror-app-getting-error-fe-sendauth-no-password)
