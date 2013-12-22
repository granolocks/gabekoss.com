include Nanoc3::Helpers::XMLSitemap
include Nanoc3::Helpers::Rendering

require 'pry'
require 'builder'

require File.expand_path('../post.rb',__FILE__)
require File.expand_path('../note.rb',__FILE__)
require File.expand_path('../tag_helper.rb',__FILE__)

include GabeKossDotCom
