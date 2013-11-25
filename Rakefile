CONTENT_DIR = File.expand_path('../content',__FILE__)
BLOG_DIR    = CONTENT_DIR + '/blog'

URLIFY = Proc.new { |str| str.downcase.gsub(/[^a-z0-9]/,'_').gsub(/_+/,'_').gsub(/_$/,'')}

namespace :generate do
  task :blog_post do


    puts 'Enter Post Title:'
    title = STDIN.gets.chomp

    date_string = Time.now.strftime('%Y-%m-%d') 

    file_name = URLIFY.call(title)
    file_path = "#{BLOG_DIR}/#{date_string}-#{file_name}.md"

    if File.exists?(file_path)
      puts "[-] File Already Exists at #{file_path}"
      exit
    end

    created_at  = Time.now.strftime('%Y-%m-%d %H:%M')
    updated_at  = created_at

    tmpl =<<POST_TEMPLATE
---
title: #{title}
created_at: #{created_at}
updated_at: #{updated_at}
kind: blog-post
summary: 
tags: 
--- 

# #{title}
 
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam adipiscing,
urna sed egestas eleifend, risus dui semper erat, vel aliquet nibh lorem quis
nibh. Morbi facilisis malesuada bibendum. Vivamus semper risus justo, sit
amet aliquet massa facilisis quis. Mauris aliquet risus lorem, in
sollicitudin sem dictum eu. Aenean vel nisi diam. Nulla facilisi. Nulla vitae
iaculis lectus. Nulla nulla arcu, dapibus at accumsan eu, euismod at elit.
Morbi eleifend eros ut libero tempus lacinia. Quisque ac mi eros. Suspendisse
dictum ligula ut placerat porta. Aenean sit amet vestibulum dui.
POST_TEMPLATE

  File.write(file_path, tmpl)
  puts "[+] Created new blog post at #{file_path}"

  end
end

