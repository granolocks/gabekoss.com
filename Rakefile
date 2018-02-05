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
author: #{args[:author]}
summary: 
tags: 
--- 

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
  
  desc "generate gallery thumbs"
  task :gallery_thumbs do
    puts "WARNING! This script is currently descrtuctive!"
    puts ""
    puts "It will delete every image from the content/images/gallery directory That has the"
    puts "string 'thumbnail' in its file name.  All other files will get a 280x140"
    puts "thumbnail generated with a filename like 'originalfilename-thumbnail.jpg'."
    puts "These thumbnails will be placed in the content/images/gallery directory."
    puts ""
    puts "Currently only supports files with the .jpg extension. "
    puts ""
    puts "Do you wish to proceed? y/n (default: y)"

    until %w{y n}.include?(command = $stdin.gets.chomp.downcase) do
      puts "invalid input."
      puts "enter y or n to proceed"
      puts "CTRL^C to break"
    end

    if command  == 'n'
      puts "exiting"
      exit 1
    end

    IMAGE_DIR = File.expand_path('../content/images/gallery/',__FILE__)

    dirs = Dir.entries(IMAGE_DIR).reject{|x| %w{ . .. }.include?(x)}
    images = []

    dirs.map{|x|File.join(IMAGE_DIR, x)}.each do |dir|
      images += Dir.entries(dir).select{|x| x =~ /.jpg/}.map{|x|File.join(dir,x)}
    end

    thumbnails = images.select{|x|x=~/thumbnail/}
    images = images - thumbnails

    thumbnails.each do |image|
      puts "rming #{image}"
      File.unlink(image)
    end

    check = thumbnails.map{|x| File.exist?(x)}


    images.each do |image|
      dirpath =  image.split('/')
      filename = dirpath.pop
      dirpath = File.join(dirpath)
      name, ext = filename.split('.')
      # might need to use the resolution for something
      #  meta = `identify #{image}`
      #  _, format, res, res2, chan, mode, size, _, _ = meta.split ' '

      thumbnail = File.join(dirpath, "#{name}-thumbnail.#{ext}")

      puts "converting #{image} to #{thumbnail}"
      `convert #{image} -scale 50% -crop 280x280+0+0 -gravity center #{thumbnail}`
    end
  end

  desc "make a blogpost template"
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
      kind:        "blog-post",
      author:      "Gabe Koss"
    })

    begin
      puts "[+] Created new blog post at #{file_path}"
      File.write(file_path, template)
    rescue
      puts "[-] Failed to create new blog post at #{file_path}"
      puts "[-] Unknown Error"
    end
  end
end
