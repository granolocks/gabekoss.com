---
title: Ruby-style data blob implemented in bash
created_at: 2014-01-18 12:20
updated_at: 2014-01-18 12:20
kind: blog-post
author: Gabe Koss
summary: A weird experiemnt in things that shouldn't be done.
tags: 
  - ruby
  - bash
  - code golf
--- 

## Ruby DATA

Ruby has a nice feature where if place the string `__END__` after the end of
your scripts functionality, the text after that delimeter is loaded into a
`DATA` File object. 

For example the following script:

```ruby
puts DATA.read

__END__
Hello Data World
```

Contain the following output:

```bash
$ ruby data.rb
Hello Data World
```

## Bash Variant

Someone wanted to have this functionality in bash so here is my attemped
solution to this problem:

```sh
f_data(){
 tail -n $(expr $(wc -l $BASH_SOURCE | cut -d " " -f 1) - $(grep -ne '#\s__END__' $BASH_SOURCE|cut -d ":" -f 1)) $BASH_SOURCE | sed -r 's/^#\s//g'
}

f_data

# __END__
# Hello Bash Data
# Foo
# Bar
```

Results in the following output:

```sh
$ bash bash_data.sh
Hello Bash Data
Foo
Bar
```

## Readable variant
Here is what is really going on, its not particularly complicated when you break it apart: 

```sh
f_data(){
  local current_file=$BASH_SOURCE
  echo "[+] Current File: $current_file"

  local total_line_count=$(wc -l $current_file | cut -d " " -f 1)
  echo "[+] Line Count: $total_line_count"

  local delimiter_line_number=$(grep -ne '#\s__END__' $current_file | cut -d ":" -f 1)
  echo "[+] Delimiter found on line $delimiter_line_number"

  local lines_to_print=$(expr $total_line_count - $delimiter_line_number)
  echo "[+] Printing $lines_to_print lines"
  echo

  tail -n $lines_to_print $current_file | sed -r 's/^#\s//g'
}

f_data

# __END__
# Hello Bash Data
# Foo
# Bar
```

The output of this is as follows:

```sh
$ bash bash_data2.sh
[+] Current File: /home/gabe/bash_data.sh
[+] Line Count: 27
[+] Delimiter found on line 24
[+] Printing 3 lines

Hello Bash Data
Foo
Bar
```


