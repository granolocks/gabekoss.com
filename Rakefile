require File.expand_path '../generators/init.rb', __FILE__


PAGES_SRC_DIR = File.expand_path  '../pages', __FILE__
POSTS_SRC_DIR = File.expand_path  '../posts', __FILE__
SITE_ROOT     = File.expand_path  '../site_root', __FILE__

namespace :generate do 
  task :page do 
    puts "Enter title: "
    title = $stdin.gets.chomp

    page = GK::Generators::Page.new(PAGES_SRC_DIR, title)
    page.generate!
  end

  task :post do 
    puts "Enter title: "
    title = $stdin.gets.chomp

    page = GK::Generators::Post.new(POSTS_SRC_DIR, title)
    page.generate!
  end
end
