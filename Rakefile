require File.expand_path '../lib/constants.rb', __FILE__
require File.expand_path '../lib/generators/init.rb', __FILE__
require File.expand_path '../lib/builders/init.rb', __FILE__

include GK::Constants

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

    post = GK::Generators::Post.new(POSTS_SRC_DIR, title)
    post.generate!
  end
end

namespace :build do
  task :stylesheets do
    stylesheets = Dir.new(STYLES_SRC_DIR).entries
      .select!{|e| e.scan(/\.scss/).size > 0}
      .map{|file| "#{STYLES_SRC_DIR}/#{file}"}

    stylesheets.each do |source_file|
      stylesheet_builder =  GK::Builders::Assets::Stylesheet.new(source_file, STYLES_DIR)
      puts "Building stylesheet from #{source_file}\n"
      puts "\t -> #{stylesheet_builder.output_file}\n"
      stylesheet_builder.build!
    end
  end
end
