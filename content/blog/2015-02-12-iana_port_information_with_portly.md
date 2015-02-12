---
title: IANA Port information with Portly
created_at: 2015-02-12 02:52
updated_at: 2015-02-12 02:52
kind: blog-post
author: Gabe Koss
summary:  Introduction to a lightweight data Gem I tossed up. 
tags: 
- gem
- ruby
- tcp
- port
- iana
--- 

The other day I dropped a small gem which exposes the IANA port registry data
into a simple Ruby interface. This is something I have a use for at work as
well as other projects. 

The data is extracted from the CSV file provided through the [IANA registry
here](http://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml).


Install simply with RubyGems: 

```sh
gem install portly
```

After that point there is a very simple interface to get information about any
port registered with IANA. This will return an array of Hash objects each of
which is tied to a specific transport protocal.

```ruby
require 'portly'
Portly.lookup 22
#=> [{"service_name"=>"ssh", "port_number"=>22, "transport_protocol"=>"tcp", "description"=>"The Secure Shell (SSH) Protocol", "assignee"=>nil, "contact"=>nil, "registration_date"=>nil, "modification_date"=>nil, "reference"=>"[RFC4251]", "service_code"=>nil, "known_unauthorized_uses"=>nil, "assignment_notes"=>"Defined TXT keys: u=<username> p=<password>"}, {"service_name"=>"ssh", "port_number"=>22, "transport_protocol"=>"udp", "description"=>"The Secure Shell (SSH) Protocol", "assignee"=>nil, "contact"=>nil, "registration_date"=>nil, "modification_date"=>nil, "reference"=>"[RFC4251]", "service_code"=>nil, "known_unauthorized_uses"=>nil, "assignment_notes"=>"Defined TXT keys: u=<username> p=<password>"}, {"service_name"=>"ssh", "port_number"=>22, "transport_protocol"=>"sctp", "description"=>"SSH", "assignee"=>"[Randall_Stewart]", "contact"=>"[Randall_Stewart]", "registration_date"=>nil, "modification_date"=>nil, "reference"=>"[RFC4960]", "service_code"=>nil, "known_unauthorized_uses"=>nil, "assignment_notes"=>"Defined TXT keys: u=<username> p=<password>"}] 
```

In the near future I intend to add a simple, optional protocol filter to the
`Portly#lookup` method.
