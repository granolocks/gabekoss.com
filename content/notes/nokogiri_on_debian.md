---
kind: note
title: Install Nokogori on Debian
updated_at: 2013-11-07 06:59
tags:
 - debian
 - ruby
 - libxml
 - utilities
---

When installing the Nokogiri gem on a debian system you may encounter a
stacktrace as follows:


```bash
Gem::Ext::BuildError: ERROR: Failed to build gem native extension.

    /home/user/.rvm/rubies/ruby-1.9.3-p545/bin/ruby extconf.rb
    checking for socket() in -lsocket... no
    checking for gethostbyname() in -lnsl... yes
    checking for atan() in -lm... no
    checking for atan() in -lm... yes
    checking for inflate() in -lz... yes
    checking for iconv_open() in -liconv... no
    checking for libiconv_open() in -liconv... no
    checking for libiconv_open() in -llibiconv... no
    checking for iconv_open() in -llibiconv... no
    checking for iconv_open() in -lc... yes
    checking for xmlParseDoc() in -lxml2... no
    checking for xmlParseDoc() in -llibxml2... no
    checking for xmlParseDoc() in -lxml2... no
    *** extconf.rb failed ***
    Could not create Makefile due to some reason, probably lack of
    necessary libraries and/or headers.  Check the mkmf.log file for more
    details.  You may need configuration options.

    ...
```

This can be solved by installing the following deps:

```bash
sudo apt-get install libxslt-dev libxml2-dev
```

At this point you can run the usual `gem install nokogiri` or bundle.

