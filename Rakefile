CONTENT_DIR = File.expand_path('../content',__FILE__)
BLOG_DIR    = CONTENT_DIR + '/blog'

URLIFY      = Proc.new { |str| str.downcase.gsub(/[^a-z0-9]/,'_').gsub(/_+/,'_').gsub(/_$/,'')}

TEMPLATE = Proc.new do |args|
<<TMPL
---
title: #{args[:title]}
created_at: #{args[:created_at]}
updated_at: #{args[:updated_at]}
kind: #{args[:kind]}
summary: 
tags: 
--- 

# #{args[:title]}
 
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam adipiscing,
urna sed egestas eleifend, risus dui semper erat, vel aliquet nibh lorem quis
nibh. Morbi facilisis malesuada bibendum. Vivamus semper risus justo, sit
amet aliquet massa facilisis quis. Mauris aliquet risus lorem, in
sollicitudin sem dictum eu. Aenean vel nisi diam. Nulla facilisi. Nulla vitae
iaculis lectus. Nulla nulla arcu, dapibus at accumsan eu, euismod at elit.
Morbi eleifend eros ut libero tempus lacinia. Quisque ac mi eros. Suspendisse
dictum ligula ut placerat porta. Aenean sit amet vestibulum dui.
TMPL
end

namespace :generate do
  task :blog_post do
    puts 'Enter Post Title:'
    title = STDIN.gets.chomp

    file_path = "#{BLOG_DIR}/#{Time.now.strftime('%Y-%m-%d')}-#{URLIFY.call(title)}.md"

    if File.exists?(file_path)
      puts "[-] File Already Exists at #{file_path}"
      exit
    end

    template = TEMPLATE.call({
      title:       title,
      created_at:  Time.now.strftime('%Y-%m-%d %H:%M'),
      updated_at:  Time.now.strftime('%Y-%m-%d %H:%M'),
      kind:        "blog-post"
    })

    begin
    File.write(file_path, template)
      puts "[+] Created new blog post at #{file_path}"
    rescue
      puts "[-] Failed to create new blog post at #{file_path}"
      puts "[-] Unknown Error"
    end
  end
end
