# All files in the 'lib' directory will be loaded
# before nanoc starts compiling.
#
#include Nanoc3::Helpers::Blogging
#include Nanoc3::Helpers::Tagging
#include Nanoc3::Helpers::Rendering
#include Nanoc3::Helpers::LinkTo
include Nanoc3::Helpers::XMLSitemap

require 'pry'
require 'builder'

def blog_post_tags_hash(items)
  posts = items.reject {|i| !(i[:kind] == 'blog-post') }

  posts.inject({}) do |hash,post|
    tags =* post[:tags]

    tags.each do |t|
      cur =* hash[t]
      hash[t] = cur << post
    end

    hash
  end
end

