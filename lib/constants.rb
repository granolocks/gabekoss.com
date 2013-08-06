module GK
  module Constants
    #Helpful
    GENERATOR_TEMPLATE_DIR = File.expand_path '../generators/templates', __FILE__

    # erb, yml, coffee and scss files for generating the site..
    SITE_SRC_DIR   = File.expand_path  '../../site_src', __FILE__
    PAGES_SRC_DIR  = File.join SITE_SRC_DIR, 'pages'
    POSTS_SRC_DIR  = File.join SITE_SRC_DIR, 'posts'
    ASSETS_SRC_DIR = File.join SITE_SRC_DIR, 'assets'
    STYLES_SRC_DIR = File.join ASSETS_SRC_DIR, "styles"
    JS_SRC_DIR     = File.join ASSETS_SRC_DIR, "js"
    # not sure what the best approach to take with images is
    IMG_SRC_DIR    = File.join ASSETS_SRC_DIR, "img"

    # the actual rendered site will go over here
    SITE_ROOT      = File.expand_path  '../../site_root', __FILE__
    STYLES_DIR     = File.join SITE_ROOT, "styles"
    JS_DIR         = File.join SITE_ROOT, "js"
    # not sure what the best approach to take with images is
    IMG_DIR        = File.join SITE_ROOT, "img"
  end
end

# Ensure that all of the above mentioned
# directories are in place before we do
# anything.
GK::Constants.constants.each do |const|
  directory = GK::Constants.const_get(const)
  unless Dir.exists? directory
    puts "Creating #{directory}"
    Dir.mkdir directory
  end
end
