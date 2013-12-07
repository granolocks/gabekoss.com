#include Nanoc3::Helpers::Blogging
#include Nanoc3::Helpers::Tagging
#include Nanoc3::Helpers::Rendering
#include Nanoc3::Helpers::LinkTo
include Nanoc3::Helpers::XMLSitemap

require 'pry'
require 'builder'

require File.expand_path('../post.rb',__FILE__)
require File.expand_path('../tag_helper.rb',__FILE__)

include GabeKossDotCom
