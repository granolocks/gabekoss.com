module GK
  module Constants
    PAGES_SRC_DIR  = File.expand_path  '../../site_parts/pages', __FILE__
    POSTS_SRC_DIR  = File.expand_path  '../../site_parts/posts', __FILE__

    GENERATOR_TEMPLATE_DIR = File.expand_path '../generators/templates', __FILE__

    ASSETS_SRC_DIR = File.expand_path  '../../site_parts/assets', __FILE__
    STYLES_SRC_DIR = "#{ASSETS_SRC_DIR}/styles"
    JS_SRC_DIR     = "#{ASSETS_SRC_DIR}/js"
    IMG_SRC_DIR    = "#{ASSETS_SRC_DIR}/img"

    SITE_ROOT      = File.expand_path  '../../site_root', __FILE__
    STYLES_DIR     = "#{SITE_ROOT}/styles"
    JS_DIR         = "#{SITE_ROOT}/js"
    IMG_DIR        = "#{SITE_ROOT}/img"
  end
end

GK::Constants.constants.each do |const|
  directory = GK::Constants.const_get(const)
  unless Dir.exists? directory
    puts "Creating #{directory}"
    Dir.mkdir directory
  end
end
