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
  task :assets do
    sass_files = Dir.new(STYLES_SRC_DIR).entries
      .select!{|e| e.scan(/\.scss/).size > 0}
      .map{|file| "#{STYLES_SRC_DIR}/#{file}"}

    sass_files.each do |file|
      style_sheet_builder =  GK::Builders::Assets::Stylesheet.new(file, STYLES_DIR)
      puts "Building stylesheet from #{file}\n"
      puts "\t -> #{style_sheet_builder.output_file}\n"
      style_sheet_builder.build!
    end

  end
end
