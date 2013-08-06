require File.expand_path '../lib/constants.rb', __FILE__
require File.expand_path '../lib/erb_renderer.rb', __FILE__
require File.expand_path '../lib/md_to_html.rb', __FILE__
require File.expand_path '../lib/generators/init.rb', __FILE__
require File.expand_path '../lib/builders/init.rb', __FILE__

include GK::Constants

namespace :generate do 
  
  desc "Generate a page markdown file and metadata yaml file"
  task :page do 
    puts "Enter title: "
    title = $stdin.gets.chomp

    page = GK::Generators::Page.new(PAGES_SRC_DIR, title)
    page.generate!
  end

  desc "Generate a post markdown file and metadata yaml file"
  task :post do 
    puts "Enter title: "
    title = $stdin.gets.chomp

    post = GK::Generators::Post.new(POSTS_SRC_DIR, title)
    post.generate!
  end
end

namespace :build do
  desc "Build all stylesheets into css files in the site root."
  task :stylesheets do
    stylesheets = Dir.new(STYLES_SRC_DIR).entries
      .select!{|e| e.scan(/\.scss/).size > 0}
      .map{|file| File.join(STYLES_SRC_DIR, file)}

    stylesheets.each do |source_file|
      stylesheet_builder =  GK::Builders::Assets::Stylesheet.new(source_file, STYLES_DIR)
      puts "Building stylesheet from #{source_file}\n"
      puts "\t -> #{stylesheet_builder.output_file}\n"
      stylesheet_builder.build!
    end
  end

  desc "Build all coffee files into js files in the site root."
  task :js do
    scripts = Dir.new(JS_SRC_DIR).entries
      .select!{|e| e.scan(/\.coffee/).size > 0}
      .map{|file| File.join JS_SRC_DIR, file}

    scripts.each do |source_file|
      stylesheet_builder =  GK::Builders::Assets::JS.new(source_file, JS_DIR)
      puts "Building javascript from #{source_file}\n"
      puts "\t -> #{stylesheet_builder.output_file}\n"
      stylesheet_builder.build!
    end
  end

  desc "Build all assets..."
  task :assets => [:stylesheets, :js]

  namespace :html do
    desc "Build all pages into HTML files."
    task :pages do
      page_dirs = Dir.new(PAGES_SRC_DIR).entries
        .select!{|e|(e!='.')&&(e!='..')}
      GK::Builders::HTML::Page.new
      puts page_dirs.inspect
    end

    desc "Build all posts into HTML files."
    task :posts do
      post_dirs = Dir.new(POSTS_SRC_DIR).entries
        .select!{|e|(e!='.')&&(e!='..')}
      GK::Builders::HTML::Post.new
      puts post_dirs.inspect
    end
  end
end
